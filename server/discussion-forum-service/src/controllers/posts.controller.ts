import { Request, Response } from "express";
import { posts } from "../data/mockDatabase";
import PostModel, { Post } from "../models/post.model";
import { v4 as uuidv4 } from "uuid";

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const post: Post | null = await PostModel.findById(_id);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: "Post not found", error: error.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userPosts: Post[] = await PostModel.find({ user_id: userId });
    res.status(200).json(userPosts);
  } catch (error: any) {
    res
      .status(404)
      .json({ message: "User posts not found", error: error.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostModel.find();
    res.json(posts);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error retreiving posts", error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { _id, updatedContent } = req.body;
    const post: Post | null = await PostModel.findOneAndUpdate(
      _id,
      updatedContent,
      { new: true }
    );
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: "Post not found", error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    user_id: uuidv4(),
    title,
    content,
    tags: tags || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    likes: 0,
    comments_count: 0,
  };

  await new PostModel(newPost).save();

  res.status(201).json(newPost);
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndDelete(id);
    // The query above could result in returning a post or null, either way it doesn't matter
    res.status(200);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
