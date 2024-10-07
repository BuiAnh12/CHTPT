// pages/api/flight/[flightid]/seat/register/[seatid].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateData, readData } from '../../../../../../util/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flightid, seatid } = req.query;

  if (req.method === 'POST') {
    const path = `flights/${flightid}/seats/${seatid}`;

    try {
      // Get current seat data
      const seatData = await readData(path);

      // Check if the seat status is 'register'
      if (seatData.status === 'purchase') {
        return res.status(400).json({ error: 'Cannot reset seat status; it has already been purchased.' });
      }

      if (seatData.status !== 'register') {
        return res.status(400).json({ error: 'Seat is not in the register status.' });
      }

      // Reset seat status to 'free'
      const updatedSeatData = {
        status: 'free',
        registeredBy: null,  // Clear registeredBy information
        purchasedBy: null,   // Clear purchasedBy information
      };

      await updateData(path, updatedSeatData);
      return res.status(200).json({ message: 'Seat status reset to free successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', detail: error });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}