import { Request, Response } from "express";
import { posts } from "../data/mockDatabase";
import { Post } from "../models/post.model";
import { v4 as uuidv4 } from "uuid";

export const getAllPosts = (req: Request, res: Response) => {
  res.json(posts);
};

export const getPostById = (req: Request, res: Response) => {
  const { id } = req.params;
  const post = posts.find((p) => p._id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost: Post = {
    _id: uuidv4(),
    user_id: uuidv4(),
    title,
    content,
    tags: tags || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    comments_count: 0,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};