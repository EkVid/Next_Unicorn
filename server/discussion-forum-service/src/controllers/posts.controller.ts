import { Request, Response } from "express";
import PostModel, { Post } from "../models/post.model";
import CommentModel from "../models/comment.model";

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post: Post | null = await PostModel.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: "Post not found", error: error.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userPosts: Post[] = await PostModel.find({ user_id: id });
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
    res.status(200).json(posts);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error retreiving posts", error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post: Post | null = await PostModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(post);
  } catch (error: any) {
    res.status(404).json({ message: "Post not found", error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, content, tags } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newPost = {
      user_id: user_id,
      title,
      content,
      tags: tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Likes and comments begin at 0, by model default
    };

    const createdPost = await new PostModel(newPost).save();

    res.status(201).json(createdPost);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: " + error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  // Delete post, and all associated comments
  try {
    const { id } = req.params;
    await PostModel.findByIdAndDelete(id);
    await CommentModel.deleteMany({ post_id: id });
    // The query above could result in returning a post or null, either way it doesn't matter
    res.status(200).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
