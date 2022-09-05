// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../middleware/database";


export default async function handler(req: NextApiRequest,res: NextApiResponse) {


  const {db} = await connectToDatabase();
  const collection = await db.collection("snippet").find({}).toArray();

  res.json(collection);

}
