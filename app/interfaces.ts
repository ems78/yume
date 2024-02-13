import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose";
import { Request } from "express";

interface Tag extends Document {
  _id: ObjectId;
  name: string;
  userId: ObjectId;
}

interface TagProps {
  tag: Tag;
  handleEditTag: (tagId: string, editedTagName: string) => void;
  handleDeleteTag: (tagId: string) => void;
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
  handleDeleteClick: (logId: string) => void;
}

interface DreamLogFormProps {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  addDreamLog: (logId: string) => void;
}

interface User extends Document {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  // tags: Types.ObjectId[];
  // dreamLogs: Types.ObjectId[];
}

interface TokenPayload {
  userId: ObjectId;
  userEmail: string;
}

interface RequestWithUser extends Request {
  user: TokenPayload;
}

export { Tag, TagProps, DreamLog, LogProps, DreamLogFormProps, User, TokenPayload, RequestWithUser };
