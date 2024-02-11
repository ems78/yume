import mongoose from "mongoose";
import { Tag, DreamLog } from "./interfaces";

mongoose.connect(process.env.MONGODB_URI || "");

const tagSchema = new mongoose.Schema<Tag>({
  name: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const dreamLogSchema = new mongoose.Schema<DreamLog>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  // dreamLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "DreamLog" }],
});

export const TagModel = mongoose.model<Tag>("Tag", tagSchema);
export const DreamLogModel = mongoose.model<DreamLog>("DreamLog", dreamLogSchema);
export const UserModel = mongoose.model("User", userSchema);
