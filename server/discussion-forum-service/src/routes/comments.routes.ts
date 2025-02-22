import express from "express";
import { addComment, getCommentsByPostId } from "../controllers/comments.controller";

const router = express.Router();

router.post("/comments", addComment);
router.get("/comments/:post_id", getCommentsByPostId);

export default router;