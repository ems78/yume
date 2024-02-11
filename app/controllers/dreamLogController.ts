import { Request, Response } from "express";
import { DreamLog, RequestWithUser } from "../interfaces";
import { ObjectId, InsertOneResult } from "mongodb";

export const getLogs = async (req: Request, res: Response) => {
  try {
    const userReq = req as RequestWithUser;
    const userIdstring = userReq.user.userId;
    const userId = new ObjectId(userIdstring);

    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const dreamLogs: DreamLog[] = await dreamLogsCollection
      .find({ userId: userId })
      .toArray();

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
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const dreamLog: DreamLog = await dreamLogsCollection.findOne({
      _id: new ObjectId(req.params.id),
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
    const userReq = req as RequestWithUser;
    const userIdstring = userReq.user.userId;
    const userId = new ObjectId(userIdstring);

    const dreamLog: DreamLog = req.body;
    dreamLog.userId = userId;

    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const result: InsertOneResult<DreamLog> =
      await dreamLogsCollection.insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding dream log: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editLog = async (req: Request, res: Response) => {
  try {
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const result: DreamLog = await dreamLogsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
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
    const dreamLogsCollection = (req as any).collections.dreamLogs;
    const result = await dreamLogsCollection.deleteOne({
      _id: new ObjectId(req.params.id),
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
