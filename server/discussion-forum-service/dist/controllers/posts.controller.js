"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.deletePostById = exports.getPostById = exports.getAllPosts = void 0;
const post_model_1 = require("../models/post.model");
const uuid_1 = require("uuid");
// Get all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.PostModel.find();
        // console.log(posts);
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
});
exports.getAllPosts = getAllPosts;
// Get post by ID
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_model_1.PostModel.findById(id);
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
});
exports.getPostById = getPostById;
// Delete post by ID
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_model_1.PostModel.findByIdAndDelete(id);
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
});
exports.deletePostById = deletePostById;
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newPost = new post_model_1.PostModel({
            _id: (0, uuid_1.v4)(),
            title,
            content,
            tags: tags || [],
            created_at: new Date(),
            updated_at: new Date(),
            likes: 0,
            comments_count: 0,
        });
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
});
exports.createPost = createPost;
