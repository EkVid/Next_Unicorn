"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const mockDatabase_1 = require("../data/mockDatabase");
const uuid_1 = require("uuid");
const getAllPosts = (req, res) => {
    res.json(mockDatabase_1.posts);
};
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => {
    const { id } = req.params;
    const post = mockDatabase_1.posts.find((p) => p._id === id);
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    res.json(post);
};
exports.getPostById = getPostById;
const createPost = (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    const newPost = {
        _id: (0, uuid_1.v4)(),
        user_id: (0, uuid_1.v4)(),
        title,
        content,
        tags: tags || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes: 0,
        comments_count: 0,
    };
    mockDatabase_1.posts.push(newPost);
    res.status(201).json(newPost);
};
exports.createPost = createPost;
