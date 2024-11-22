// pages/api/flight/[flightid]/seat/purchase/[seatid].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { updateData, readData } from "../../../../../../util/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flightid, seatid } = req.query;
  const { userId, paymentInfo, passengerDetails, registerTime, ticketCode } = req.body;

  if (req.method === "POST") {
    if (!flightid || !seatid || !userId || !paymentInfo) {
      return res.status(400).json({ error: "Flight ID, Seat ID, User ID, and Payment Info are required" });
    }

    try {
      // Check if seat is registered
      const seatPath = `flights/${flightid}/seats/${seatid}`;
      const seatData = await readData(seatPath);

      if (seatData.status !== "register" || seatData.registeredBy.userId !== userId) {
        return res.status(409).json({ error: "Seat is not registered by this user or already purchased" });
      }

      // Update seat status to purchase
      const updatedSeatData = {
        status: "purchase",
        registeredBy: null,
        purchasedBy: {
          userId,
          ticketCode,
          timestamp: registerTime,
          paymentInfo,
        },
        passengerDetails: passengerDetails,
      };
      await updateData(seatPath, updatedSeatData);
      return res.status(200).json({ message: "Seat purchased successfully", seat: updatedSeatData });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", detail: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
