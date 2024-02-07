import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose";

interface Tag extends Document {
  _id: ObjectId;
  name: string;
}

interface DreamLog extends Document {
  _id: ObjectId;
  date: Date;
  title: string;
  content: string;
  tags: Types.ObjectId[];
}

export { Tag, DreamLog };
