import express from "express";
import { createPost, getAllPosts, getPostById, deletePostById } from "../controllers/posts.controller";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.delete("/posts/:id", deletePostById);
router.post("/posts", createPost);

export default router;