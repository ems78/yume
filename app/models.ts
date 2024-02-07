import mongoose from "mongoose";
import { Tag, DreamLog } from "./interfaces";

mongoose.connect(process.env.MONGODB_URI || "");

const tagSchema = new mongoose.Schema<Tag>({
  name: { type: String, required: true, unique: true },
});

const dreamLogSchema = new mongoose.Schema<DreamLog>({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

export const TagModel = mongoose.model<Tag>("Tag", tagSchema);
export const DreamLogModel = mongoose.model<DreamLog>(
  "DreamLog",
  dreamLogSchema
);
