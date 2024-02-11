import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose";
import { Request } from "express";

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

interface LogProps {
  dreamLog: DreamLog;
}

interface User extends Document {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  tags: Types.ObjectId[];
  dreamLogs: Types.ObjectId[];
}

interface TokenPayload {
  userId: ObjectId;
  userEmail: string;
}

interface RequestWithUser extends Request {
  user: TokenPayload;
}

export { Tag, DreamLog, LogProps, User, TokenPayload, RequestWithUser };
