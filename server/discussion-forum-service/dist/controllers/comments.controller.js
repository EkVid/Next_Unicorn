"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostId = exports.addComment = void 0;
const mockDatabase_1 = require("../data/mockDatabase");
const uuid_1 = require("uuid");
const addComment = (req, res) => {
    const { post_id, content } = req.body;
    if (!post_id || !content) {
        return res.status(400).json({ message: "Post ID and content are required" });
    }
    const post = mockDatabase_1.posts.find((p) => p._id === post_id);
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    const newComment = {
        _id: (0, uuid_1.v4)(),
        post_id,
        user_id: (0, uuid_1.v4)(),
        content,
        created_at: new Date().toISOString(),
        likes: 0,
    };
    mockDatabase_1.comments.push(newComment);
    post.comments_count++;
    res.status(201).json(newComment);
};
exports.addComment = addComment;
const getCommentsByPostId = (req, res) => {
    const { post_id } = req.params;
    const filteredComments = mockDatabase_1.comments.filter((comment) => comment.post_id === post_id);
    if (filteredComments.length === 0) {
        return res.status(404).json([]);
    }
    res.json(filteredComments);
};
exports.getCommentsByPostId = getCommentsByPostId;
