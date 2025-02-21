import { Request, Response } from "express";
import { PostModel } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { v4 as uuidv4 } from "uuid";

// Add a new comment to a post
export const addComment = async (req: Request, res: Response) => {
  const { post_id, content } = req.body;

  if (!post_id || !content) {
    return res.status(400).json({ message: "Post ID and content are required" });
  }

  // Find the post by ID
  const post = await PostModel.findById(post_id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Create the new comment
  const newComment = new Comment({
    _id: uuidv4(), // Generate a new ID
    post_id,
    user_id: uuidv4(), // You can update this to get a real user ID (e.g., from the session or JWT)
    content,
    created_at: new Date().toISOString(),
    likes: 0,
  });

  // Save the new comment to the database
  await newComment.save();
  console.log("saved new comment");

  // Increment the comments count on the post
  post.comments_count++;
  await post.save();

  // Respond with the new comment
  res.status(201).json(newComment);
};

// Get all comments for a specific post
export const getCommentsByPostId = async (req: Request, res: Response) => {
  const { post_id } = req.params;

  // Find comments for the specific post
  const comments = await Comment.find({ post_id });

  if (comments.length === 0) {
    return res.status(404).json([]);
  }

  res.json(comments);
};
