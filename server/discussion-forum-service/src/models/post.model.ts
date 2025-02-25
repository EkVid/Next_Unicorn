import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  //_id is auto-generated on object creation https://www.mongodb.com/docs/manual/reference/glossary/#term-id
  _id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  likes: number;
  comments_count: number;
}

const PostSchema = new Schema<IPost>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
  },
  {
    collection: 'discussion',
  }
);

export const PostModel = mongoose.model<IPost>("Post", PostSchema, "posts");