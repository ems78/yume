import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose";

interface Tag extends Document {
  _id: ObjectId;
  name: string;
  userId: ObjectId;
}

interface DreamLog extends Document {
  _id: ObjectId;
  userId: ObjectId;
  date: Date;
  title: string;
  content: string;
  tags: Types.ObjectId[];
}

interface User extends Document {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  tags: Types.ObjectId[];
  dreamLogs: Types.ObjectId[];
}

export { Tag, DreamLog, User };
