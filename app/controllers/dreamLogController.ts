import { Request, Response } from "express";
import { DreamLog } from "../interfaces";
import { validationResult } from "express-validator";
import { ObjectId, InsertOneResult } from "mongodb";
import { addCollectionToRequest } from "../middleware/addCollectionToRequest";

export const getLogs = async (req: Request, res: Response) => {
  try {
    await addCollectionToRequest(req, res, () => {});
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const dreamLogs: DreamLog[] = await dreamLogsCollection.find({}).toArray();

    if (dreamLogs.length === 0) {
      return res.status(404).json({ message: "No logs found" });
    }

    res.status(200).json(dreamLogs);
  } catch (error) {
    console.error("Error fetching dream logs: ", error);
    res.status(500).json({ message: "Error fetching logs" });
  }
};

export const getLogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    await addCollectionToRequest(req, res, () => {});
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const dreamLog: DreamLog = await dreamLogsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!dreamLog) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(dreamLog);
  } catch (error) {
    console.error("Error fetching dream log: ", error);
    res.status(500).json({ message: "Error fetching log" });
  }
};

export const addLog = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await addCollectionToRequest(req, res, () => {});
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const dreamLog: InsertOneResult<DreamLog> =
      await dreamLogsCollection.insertOne(req.body);

    res.status(201).json(dreamLog);
  } catch (error) {
    console.error("Error adding dream log: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await addCollectionToRequest(req, res, () => {});
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const result: DreamLog = await dreamLogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating dream log: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    await addCollectionToRequest(req, res, () => {});
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const result = await dreamLogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting dream log: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
