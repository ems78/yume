import { Request, Response } from "express";
import { Tag } from "../interfaces";
import { ObjectId, InsertOneResult } from "mongodb";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tagsCollection = (req as any).collections.tags;
    const tags: Tag[] = await tagsCollection.find({}).toArray();

    if (tags.length === 0) {
      return res.status(404).json({ message: "No tags found" });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags: ", error);
    res.status(500).json({ message: "Error fetching tags" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const tagsCollection = (req as any).collections.tags;
    const tag: Tag = await tagsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag: ", error);
    res.status(500).json({ message: "Error fetching tag" });
  }
};

export const addTag = async (req: Request, res: Response) => {
  try {
    const tagsCollection = (req as any).collections.tags;
    const tag: InsertOneResult<Tag> = await tagsCollection.insertOne(req.body);

    res.status(201).json(tag);
  } catch (error) {
    console.error("Error adding tag: ", error);
    res.status(500).json({ message: "Error adding tag" });
  }
};

export const editTag = async (req: Request, res: Response) => {
  try {
    const tagsCollection = (req as any).collections.tags;
    const tag = await tagsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { new: true }
    );

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error updating tag: ", error);
    res.status(500).json({ message: "Error updating tag" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tagsCollection = (req as any).collections.tags;
    const tag: Tag = await tagsCollection.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error deleting tag: ", error);
    res.status(500).json({ message: "Error deleting tag" });
  }
};
