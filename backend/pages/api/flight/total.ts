// pages/api/flight/[flightid]/seat/
import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, updateData, writeData } from '../../../util/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            const path = `flights`;
            const allFlight = await readData(path);
            const result = {}
            for (const flightid of Object.keys(allFlight)) {
                const flight = {
                    "arrival": allFlight[flightid].arrival,
                    "departure": allFlight[flightid].departure,
                    "flight_number": allFlight[flightid].flight_number,
                    "price": allFlight[flightid].price
                }
                result[flightid] = flight
            } 
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
