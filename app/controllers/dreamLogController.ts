// // import db from '../database';
// import { Request, Response } from 'express';

// export const getLogs = async (req: Request, res: Response): Promise<void> => {

// };

// import { MongoClient } from 'mongodb';
// import { ObjectId } from 'mongodb';

import { Request, Response } from 'express';
import createMongoClient from '../database';
import { DreamLog } from '../interfaces';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const client = await createMongoClient();
        const db = client.db();

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs'); 
        const dreamLogs = await dreamLogsCollection.find({}).toArray();

        res.json(dreamLogs);
        
    } catch (error) {
        console.error('Error fetching dream logs: ', error);
        res.status(500).json({ message: 'Error fetching logs' });
    } 
};
