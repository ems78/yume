import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();

const uri: string = process.env.MONGODB_URI || "";

let cachedClient: MongoClient;

export const createMongoClient = async (): Promise<MongoClient> => {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await cachedClient.connect();
  }

  return cachedClient;
};
