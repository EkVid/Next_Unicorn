"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = exports.posts = void 0;
const uuid_1 = require("uuid");
exports.posts = [
    {
        _id: "1",
        user_id: (0, uuid_1.v4)(),
        title: "How can someone invest in private equity?",
        content: "Is there a way to invest a samall amount (say $100) in unlisted companies?",
        tags: ["investing", "equity"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes: 10,
        comments_count: 2,
    },
];
exports.comments = [
    {
        _id: "101",
        post_id: "1",
        user_id: (0, uuid_1.v4)(),
        content: "Check out the NextUnicorn. They are great!",
        created_at: new Date().toISOString(),
        likes: 5,
    },
];
