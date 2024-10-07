// pages/api/flight/[flightid]/seat/register/[seatid].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateData, readData } from '../../../../../../util/firebase';
import { scheduleSeatReset, getTimeOut } from '../../../../../../util/schedule';
import logger from '../../../../../../util/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flightid, seatid } = req.query;
  const { userId } = req.body;

  if (req.method === 'POST') {
    if (!flightid || !seatid || !userId) {
      return res.status(400).json({ error: 'Flight ID, Seat ID, and User ID are required' });
    }

    try {
      // Check if seat is available
      const seatPath = `flights/${flightid}/seats/${seatid}`;
      const seatData = await readData(seatPath);

      if (seatData.status !== 'free') {
        return res.status(409).json({ error: 'Seat is not available for registration' });
      }
      const registerTime = new Date().toISOString()
      // Update seat status to register
      const updatedSeatData = {
        status: 'register',
        registeredBy: {
          userId,
          timestamp: registerTime,
        }
      };
      await updateData(seatPath, updatedSeatData);
      logger.info(`flights/${flightid}/seats/${seatid}`)
      scheduleSeatReset(flightid as string, seatid as string, registerTime)
      logger.info("Schedule set for " + getTimeOut() + "s")
      return res.status(200).json({ message: 'Seat registered successfully', seat: updatedSeatData });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', detail: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}