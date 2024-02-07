import { Request, Response } from 'express';
import { createMongoClient } from '../database';
import { DreamLog } from '../interfaces';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const client = await createMongoClient();
        const db = client.db();

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs'); 
        const dreamLogs = await dreamLogsCollection.find({}).toArray();

        if (dreamLogs.length === 0) {
            return res.status(404).json({ message: 'No logs found' });
        }

        res.status(200).json(dreamLogs);
    } catch (error) {
        console.error('Error fetching dream logs: ', error);
        res.status(500).json({ message: 'Error fetching logs' });
    } 
};

export const getLogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const client = await createMongoClient();
        const db = client.db();

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs');
        const dreamLog = await dreamLogsCollection.findOne({ _id: new ObjectId(id) });

        if (!dreamLog) {
            return res.status(404).json({ message: 'Log not found' });
        }

        res.status(200).json(dreamLog);
    } catch (error) {
        console.error('Error fetching dream log: ', error);
        res.status(500).json({ message: 'Error fetching log' });
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
        const dreamLog = await dreamLogsCollection.insertOne(req.body);

        res.status(201).json(dreamLog);
    } catch (error) {
        console.error('Error adding dream log: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editLog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const client = await createMongoClient();
        const db = client.db();

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs');
        const result = await dreamLogsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );

        res.status(200).json(result); 
    } catch (error) {
        console.error('Error updating dream log: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteLog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const client = await createMongoClient();
        const db = client.db();

        const dreamLogsCollection = db.collection<DreamLog>('dreamLogs');
        const result = await dreamLogsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Log not found' });
        };

        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting dream log: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};
