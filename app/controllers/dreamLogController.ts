import { Request, Response } from 'express';
import { createMongoClient } from '../database';
import { DreamLog } from '../interfaces';
import { validationResult } from 'express-validator';

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

export const addLog = async (req: Request, res: Response) => {
    try {
        const client = await createMongoClient();
        const db = client.db();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs');
        const result = await dreamLogsCollection.insertOne(req.body);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding dream log: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};
