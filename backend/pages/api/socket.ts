import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import schedule from "node-schedule";

let io;
let isLogFileWatching = false; // Track if we are already watching the log file
let flights = {};

const initializeSocketIO = (server) => {
  if (!io) {
    io = new Server(server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }
};

export default function SocketHandler(req, res) {
  try {
    if (!io) {
      initializeSocketIO(res.socket.server);
      res.socket.server.io = io;

      const logFilePath = path.join(process.cwd(), "logs/server.log");

      io.on("connection", (socket) => {
        console.log("Client connected");

        // Check if we are already watching the log file
        if (!isLogFileWatching) {
          isLogFileWatching = true; // Set the flag to true
          // Watch the log file and emit logs in real-time
          const logStream = fs.watchFile(logFilePath, { interval: 1000 }, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
              const logs = fs.readFileSync(logFilePath, "utf-8");
              io.emit("serverLog", logs);
            }
          });
        }

        socket.on("joinFlight", ({ flightId, flightInfo }) => {
          // Kiểm tra xem socket đã tham gia flightId chưa
          if (!socket.rooms.has(flightId)) {
            socket.join(flightId);

            // Store the flight data if not already present
            if (!flights[flightId]) {
              flights[flightId] = flightInfo;
            }

            console.log(`User joined flight: ${flightId}`);

            // Send the flight information to the client
            socket.emit("flightInfo", { flightInfo: flights[flightId] });
          }
        });

        // Handle seat lock
        socket.on("lockSeat", ({ flightId, seatId, userId, passengerDetails }) => {
          const flight = flights[flightId];
          if (flight) {
            const seat = flight.seats[seatId];
            if (seat && seat.status === "free") {
              const registerTime = new Date().toISOString();

              seat.status = "locked";
              seat.lockedBy = { userId, timestamp: registerTime };
              seat.passengerDetails = {
                ...passengerDetails,
                seatId,
                status: "locked",
              };

              // Emit update to all clients in the room
              io.to(flightId).emit("seatStatusUpdated", {
                seatId,
                status: "locked",
                lockedBy: {
                  userId,
                  timestamp: registerTime,
                },
                passengerDetails: {
                  ...passengerDetails,
                  seatId,
                  status: "locked",
                },
              });

              // Set a timeout to auto-release the seat after 30 seconds if not confirmed
              setTimeout(() => {
                if (seat.status === "locked") {
                  seat.status = "free";
                  seat.lockedBy = null;
                  seat.registeredBy = null;
                  seat.passengerDetails = {
                    ...passengerDetails,
                    seatId: null,
                    status: "free",
                  };

                  io.to(flightId).emit("seatStatusUpdated", {
                    seatId,
                    status: "free",
                    lockedBy: null,
                    registeredBy: null,
                    passengerDetails: {
                      ...passengerDetails,
                      seatId: null,
                      status: "free",
                    },
                  });
                }
              }, 30000); // 30 seconds timeout
            }
          }
        });

        const scheduledJobs = new Map();

        // Handle seat unlock
        socket.on("unlockSeat", ({ flightId, seatId, passengerDetails }) => {
          const flight = flights[flightId];
          if (flight) {
            const seat = flight.seats[seatId];
            if ((seat && seat.status === "locked") || (seat && seat.status === "register")) {
              seat.status = "free";
              seat.lockedBy = null;
              seat.registeredBy = null;
              seat.passengerDetails = {
                ...passengerDetails,
                seatId: null,
                status: "free",
              };

              io.to(flightId).emit("seatStatusUpdated", {
                seatId,
                status: "free",
                lockedBy: null,
                registeredBy: null,
                passengerDetails: {
                  ...passengerDetails,
                  seatId: null,
                  status: "free",
                },
              });

              // Cancel the scheduled job if it exists
              const jobKey = `${flightId}-${seatId}`;
              if (scheduledJobs.has(jobKey)) {
                const job = scheduledJobs.get(jobKey);
                job.cancel(); // Cancel the job
                scheduledJobs.delete(jobKey); // Remove it from the Map
                console.log(`Scheduled job for seat ${seatId} on flight ${flightId} has been canceled.`);
              }
            }
          }
        });

        // Listen for seat reservation events
        socket.on("seatReserved", ({ flightId, seatId, userId, passengerDetails, registerTime }) => {
          const flight = flights[flightId];
          if (flight) {
            const seat = flight.seats[seatId];
            if (seat && seat.status === "locked") {
              seat.status = "register";
              seat.lockedBy = null;
              seat.registeredBy = {
                userId,
                timestamp: registerTime,
              };
              seat.passengerDetails = {
                ...passengerDetails,
                seatId: null,
                status: "register",
              };

              // Emit update to all clients in the room
              io.to(flightId).emit("seatStatusUpdated", {
                seatId,
                status: "register",
                registeredBy: {
                  userId,
                  timestamp: registerTime,
                },
                passengerDetails: {
                  ...passengerDetails,
                  seatId,
                  status: "register",
                },
              });

              // Schedule seat reset after timeout
              const timeoutDuration = 60000 * 5;
              const timeoutTime = new Date(Date.parse(registerTime) + timeoutDuration);

              const job = schedule.scheduleJob(timeoutTime, async () => {
                // Check if the seat is still registered (in case it's updated manually)
                const updatedFlight = flights[flightId];
                const updatedSeat = updatedFlight?.seats[seatId];

                if (updatedSeat && updatedSeat.status === "register") {
                  updatedSeat.status = "free";
                  seat.lockedBy = null;
                  seat.registeredBy = null;
                  seat.passengerDetails = {
                    ...passengerDetails,
                    seatId: null,
                    status: "free",
                  };

                  // Emit update to all clients in the room
                  io.to(flightId).emit("seatStatusUpdated", {
                    seatId,
                    status: "free",
                    lockedBy: null,
                    registeredBy: null,
                    passengerDetails: {
                      ...passengerDetails,
                      seatId: null,
                      status: "free",
                    },
                  });

                  console.log(`Socket Seat ${seatId} on flight ${flightId} has been reset to free after timeout.`);
                }

                scheduledJobs.delete(`${flightId}-${seatId}`);
              });

              scheduledJobs.set(`${flightId}-${seatId}`, job);
            }
          }
        });

        socket.on("seatPurchased", ({ flightId, seatId, userId, passengerDetails, paymentInfo }) => {
          const flight = flights[flightId];
          if (flight) {
            const seat = flight.seats[seatId];
            if (seat && seat.status === "register") {
              const registerTime = new Date().toISOString();

              seat.status = "purchase";
              seat.lockedBy = null;
              seat.registeredBy = null;
              seat.purchasedBy = {
                userId,
                timestamp: registerTime,
                paymentInfo,
              };
              seat.passengerDetails = {
                ...passengerDetails,
                seatId,
                status: "purchase",
              };

              // Emit update to all clients in the room
              io.to(flightId).emit("seatStatusUpdated", {
                seatId,
                status: "purchase",
                purchasedBy: {
                  userId,
                  timestamp: registerTime,
                  paymentInfo,
                },
                passengerDetails: {
                  ...passengerDetails,
                  seatId,
                  status: "purchase",
                },
              });
            }
          }
        });

        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
    }
    res.end();
  } catch (error) {
    console.error("SocketHandler error:", error);
    res.status(500).end();
  }
}
