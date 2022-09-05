import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI)
  throw new Error(
    "Please define the MONGODB_URI enviornment variable inside .env.local"
  );
if (!MONGODB_DB)
  throw new Error(
    "Please define the MONGO_DB enviornment variable inside .env.local"
  );

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    return {
      client,
      db: client.db(MONGODB_DB),
    };
  });

  return client;
}
