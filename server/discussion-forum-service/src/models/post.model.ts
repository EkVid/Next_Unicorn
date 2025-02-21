import { Schema, model } from "mongoose";
export interface Post {
  //_id is auto-generated on object creation https://www.mongodb.com/docs/manual/reference/glossary/#term-id
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  likes: number;
  comments_count: number;
}

// Schema corresponding to Post interface
const postSchema = new Schema<Post>({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  comments_count: { type: Number, default: 0, required: true },
});

// Model Creation
const PostModel = model<Post>("Post", postSchema);

export default PostModel;
