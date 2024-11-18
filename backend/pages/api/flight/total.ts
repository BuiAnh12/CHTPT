// pages/api/flight/total/
import type { NextApiRequest, NextApiResponse } from "next";
import { readData } from "../../../util/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const path = `flights`;
      const allFlight = await readData(path);

      // Chuyển đổi đối tượng allFlight thành một mảng
      const result = Object.keys(allFlight).map((flightId) => {
        const { seats, ...flightWithoutSeats } = allFlight[flightId]; // Bỏ trường `seats`
        return {
          flightId,
          ...flightWithoutSeats,
        };
      });

      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ error: "We could not find the resource you requested" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Unexpected internal server error", detail: err });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
