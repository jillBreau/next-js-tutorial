import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.publicapis.org/entries', {
      method: "GET",
    });
    const data = await response.json();
    res.status(200).json(data);
    return res;
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
};
