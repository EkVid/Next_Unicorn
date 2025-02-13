import { Request, Response } from "express";
import { comments, posts } from "../data/mockDatabase";
import { Comment } from "../models/comment.model";
import { v4 as uuidv4 } from "uuid";

export const addComment = (req: Request, res: Response) => {
  const { post_id, content } = req.body;
  if (!post_id || !content) {
    return res.status(400).json({ message: "Post ID and content are required" });
  }

  const post = posts.find((p) => p._id === post_id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const newComment: Comment = {
    _id: uuidv4(),
    post_id,
    user_id: uuidv4(),
    content,
    created_at: new Date().toISOString(),
    likes: 0,
  };

  comments.push(newComment);
  post.comments_count++;

  res.status(201).json(newComment);
};

export const getCommentsByPostId = (req: Request, res: Response) => {
  const { post_id } = req.params;

  const filteredComments: Comment[] = comments.filter(
    (comment) => comment.post_id === post_id
  );

  if (filteredComments.length === 0) {
    return res.status(404).json([]);
  }

  res.json(filteredComments);
};