import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePost,
} from "../controllers/posts.controller";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.get("/posts/user/:id", getUserPosts);

router.post("/posts", createPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
