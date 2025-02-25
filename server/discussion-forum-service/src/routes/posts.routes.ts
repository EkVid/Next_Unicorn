import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePostById,
  getUserPosts,
  updatePost,
} from "../controllers/posts.controller";

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.get("/posts/:id", getPostById);
router.delete("/posts/:id", deletePostById);
router.get("/posts/user/:id", getUserPosts);
router.patch("/posts/:id", updatePost);

export default router;
