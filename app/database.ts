import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config(); 

const uri: string = process.env.MONGODB_URI || ''; 

const createMongoClient = async (): Promise<MongoClient> => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect(); 

    return client;
};

export default createMongoClient; 
