// pages/api/user/register/[userid].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { writeData } from '../../../../util/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userid } = req.query;
  const { name, email } = req.body;

  if (req.method === 'POST') {
    if (!userid || !name || !email) {
      return res.status(400).json({ error: 'User ID, name, and email are required' });
    }
    const path = `users/${userid}`;
    const data = { name, email };
    try {
      await writeData(path, data);
      return res.status(201)
    }
    catch (error) {
      if (error.message === 'Data already exists') {
        return res.status(409).json({ error: 'User already exists' });  // 409 Conflict status for existing data
      }
      return res.status(500).json({ error: 'Unexpected internal server error', detail: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
