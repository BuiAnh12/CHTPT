import { Server } from "socket.io";
import fs from "fs";
import path from "path";

let io;

export default function SocketHandler(req, res) {
    try {
        if (!io) {
            io = new Server(res.socket.server, {
                path: "/api/socket",
            });
            res.socket.server.io = io;
    
            // Read logs from file and emit to the client
            const logFilePath = path.join(process.cwd(), 'logs/server.log');
    
            io.on("connection", (socket) => {
                console.log("Client connected");
    
                // Watch the log file and emit logs in real-time
                const logStream = fs.watchFile(logFilePath, { interval: 1000 }, (curr, prev) => {
                    if (curr.mtime !== prev.mtime) {
                        const logs = fs.readFileSync(logFilePath, 'utf-8');
                        io.emit('serverLog', logs); // Send logs to frontend
                    }
                });
    
                socket.on("disconnect", () => {
                    console.log("Client disconnected");
                });
            });
        }
        res.end();
    }
    catch (error) {

    }
}
