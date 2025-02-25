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
    // user_id: uuidv4(), // TODO: remains a false id until this point.
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

// Get all comments for a specific post
export const getCommentsByPostId = async (req: Request, res: Response) => {
  // add more specific error detection.
  const { post_id } = req.params;

  const comments = await Comment.find({ post_id });

  if (comments.length === 0) {
    return res.status(404).json([]);
// original
// export const getCommentsByPostId = async (req: Request, res: Response) => {
//   try {
//     const { post_id } = req.params;
//     const comments: IComment[] | null = await CommentModel.find({
//       post_id: post_id,
//     });
//     res.status(200).json(comments);
//   } catch (error: any) {
//     if (error.name === "DocumentNotFoundError") {
//       res
//         .status(404)
//         .json({ message: "Post comments not found", error: error.message });
//     }
//     res.status(500).json({ error: error.message });
  }
};

//  res.json(comments);
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;
    const comment: IComment | null = await CommentModel.findByIdAndDelete(
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
