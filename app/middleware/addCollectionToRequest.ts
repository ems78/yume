import { Request, Response, NextFunction } from "express";
import { createMongoClient } from "../database";
import { Collection } from "mongodb";
import { Tag, DreamLog, User } from "../interfaces";

interface CollectionMiddleware {
  tags: Collection<Tag>;
  dreamLogs: Collection<DreamLog>;
  users: Collection<User>;
}

/**
 * Adds collections to the request object for
 * easy access in subsequent middleware or routes.
 */
export const addCollectionToRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await createMongoClient();
    const db = client.db();

    const collectionMiddleware: CollectionMiddleware = {
      tags: db.collection<Tag>("tags"),
      dreamLogs: db.collection<DreamLog>("dreamLogs"),
      users: db.collection<User>("users"),
    };

    (req as any).collections = collectionMiddleware;

    next();
  } catch (error) {
    console.error("Error adding collection to request: ", error);
    res.status(500).json({ message: "Error adding collection to request" });
  }
};
