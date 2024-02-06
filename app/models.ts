import mongoose, { Schema } from 'mongoose';
import { Tag, DreamLog } from './interfaces';

export const tagSchema = new Schema<Tag>({
    name: { type: String, required: true }
});

export const dreamLogSchema = new Schema<DreamLog>({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

export default mongoose.model<DreamLog>('DreamLog', dreamLogSchema);
