import { Request, Response } from "express";
import { PostModel } from "../models/post.model";
import { v4 as uuidv4 } from "uuid";

// Get all posts available in database
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get specific post by ID (path param)
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Delete specific post by ID (path param)
export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// original delete by reference
// export const deletePost = async (req: Request, res: Response) => {
//   // Delete post, and all associated comments
//   try {
//     const { id } = req.params;
//     await PostModel.findByIdAndDelete(id);
//     await CommentModel.deleteMany({ post_id: id });
//     // The query above could result in returning a post or null, either way it doesn't matter
//     res.status(200).send();
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Create a new post with body
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = new PostModel({
      _id: uuidv4(),
      title,
      content,
      tags: tags || [],
      created_at: new Date(),
      updated_at: new Date(),
      likes: 0,
      comments_count: 0,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};


