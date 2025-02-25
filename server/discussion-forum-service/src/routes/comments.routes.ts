import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
} from "../controllers/comments.controller";

const router = express.Router();

router.post("/comments", createComment);
router.get("/comments/:post_id", getCommentsByPostId);
router.delete("/comments/:comment_id", deleteComment);
export default router;