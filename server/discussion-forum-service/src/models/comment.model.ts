import { ObjectId, Schema, model } from "mongoose";

export interface IComment {
  post_id: ObjectId;
  user_id: string;
  content: string;
  created_at: string;
  likes: number;
}

const commentSchema = new Schema<IComment>(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post model
      required: true,
    },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: String, required: true },
    likes: { type: Number, default: 0, required: true },
  },
  {
    collection: "comments",
  }
);

const CommentModel = model<IComment>("Comment", commentSchema);

export default CommentModel;
