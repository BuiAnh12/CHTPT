// pages/api/flight/[flightid]/seat/
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData } from '../../../../util/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { flightid } = req.query;

    if (req.method === 'GET') {
        if (!flightid) {
            return res.status(400).json({ error: 'Flight ID are required.' });
        }
        try {
            const path = `flights/${flightid}`;
            const result = await readData(path);
            if (result) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ error: "We could not find the resource you requested" });
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Unexpected internal server error", detail: err })
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
