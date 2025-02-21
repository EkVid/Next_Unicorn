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
exports.getCommentsByPostId = exports.addComment = void 0;
const post_model_1 = require("../models/post.model");
const comment_model_1 = require("../models/comment.model");
const uuid_1 = require("uuid");
// Add a new comment to a post
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, content } = req.body;
    if (!post_id || !content) {
        return res.status(400).json({ message: "Post ID and content are required" });
    }
    // Find the post by ID
    const post = yield post_model_1.PostModel.findById(post_id);
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    // Create the new comment
    const newComment = new comment_model_1.Comment({
        _id: (0, uuid_1.v4)(), // Generate a new ID
        post_id,
        user_id: (0, uuid_1.v4)(), // You can update this to get a real user ID (e.g., from the session or JWT)
        content,
        created_at: new Date().toISOString(),
        likes: 0,
    });
    // Save the new comment to the database
    yield newComment.save();
    console.log("saved new comment");
    // Increment the comments count on the post
    post.comments_count++;
    yield post.save();
    // Respond with the new comment
    res.status(201).json(newComment);
});
exports.addComment = addComment;
// Get all comments for a specific post
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id } = req.params;
    // Find comments for the specific post
    const comments = yield comment_model_1.Comment.find({ post_id });
    if (comments.length === 0) {
        return res.status(404).json([]);
    }
    res.json(comments);
});
exports.getCommentsByPostId = getCommentsByPostId;
