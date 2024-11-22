// pages/api/flight/get/
import { NextApiRequest, NextApiResponse } from "next";
import { readData } from "../../../util/firebase";
import { Seat } from "../../../util/interface";

// Định nghĩa kiểu cho dữ liệu chuyến bay
interface FlightData {
  seats: { [seatId: string]: Seat };
  flightNumber: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { flightNumber, ticketCode } = req.body;

  if (!ticketCode || !flightNumber) {
    return res.status(400).json({ error: "ticketCode and flightNumber are required" });
  }

  try {
    const path = `flights`;
    const allFlight = await readData(path);

    const flights = Object.keys(allFlight).map((flightId) => {
      const { ...flightWithoutSeats } = allFlight[flightId]; // Bỏ trường `seats`
      return {
        flightId,
        ...flightWithoutSeats,
      };
    });

    // Tìm chuyến bay khớp với `flightNumber`
    const flightData = flights.find((flight: any) => flight.flightNumber === flightNumber);

    if (!flightData) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Tìm ghế khớp với `ticketCode` trong `purchasedBy`
    const seatData = flightData.seats
      ? Object.entries(flightData.seats).find(([_, seatInfo]) => seatInfo.purchasedBy?.ticketCode === ticketCode)
      : null;

    if (!seatData) {
      return res.status(404).json({ error: "Ticket not found or no seats available" });
    }

    // Trả về dữ liệu ghế và chuyến bay
    return res.status(200).json({
      flightData: flightData,
      seatid: seatData[0],
      passengerDetails: seatData[1],
    });
  } catch (error) {
    console.error("Error fetching flight data: ", error);
    return res.status(500).json({
      error: "Unexpected internal server error",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
