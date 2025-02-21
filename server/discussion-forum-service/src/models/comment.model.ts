import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  _id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes: number;
}

const CommentSchema = new Schema<IComment>(
  {
    _id: { type: String, required: true },
    post_id: { type: String, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: String, default: () => new Date().toISOString() },
    likes: { type: Number, default: 0 },
  }
);

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
