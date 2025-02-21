import { Request, Response } from "express";
import CommentModel, { Comment } from "../models/comment.model";
import PostModel, { Post } from "../models/post.model";
import { Types } from "mongoose";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { user_id, post_id, content } = req.body;

    if (!Types.ObjectId.isValid(post_id) || !content) {
      return res
        .status(400)
        .json({ message: "Valid Post ID and content are required" });
    }
    // Find the post, add the comment to it, and increase it's comments count
    const post: Post | null = await PostModel.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment: Comment = {
      post_id: post_id,
      user_id: user_id,
      content: content,
      created_at: new Date().toISOString(),
      likes: 0,
    };

    const createdComment = await new CommentModel(newComment).save();
    const updatedPost: Post | null = await PostModel.findOneAndUpdate(
      { post_id: post_id },
      { comments_count: (post.comments_count += 1) },
      { new: true }
    );

    res.status(201).json({
      createdComment,
      updatedPost,
    });
    // I think it is more wise to send back the updated post too?
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: " + error.message });
    } else if (error.name === "CastError") {
      return res.status(400).json({ error: "Cast error: " + error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const comments: Comment[] | null = await CommentModel.find({
      post_id: post_id,
    });
    res.status(200).json(comments);
  } catch (error: any) {
    if (error.name === "DocumentNotFoundError") {
      res
        .status(404)
        .json({ message: "Post comments not found", error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;
    const comment: Comment | null = await CommentModel.findByIdAndDelete(
      comment_id
    );
    if (comment != null) {
      // If the comment existed, and was deleted, reduce comments_count on post
      await PostModel.findOneAndUpdate(
        { _id: comment.post_id },
        {
          $inc: { comments_count: -1 },
        }
      );
    }
    res.status(200).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
