"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_controller_1 = require("../controllers/posts.controller");
const router = express_1.default.Router();
router.get("/posts", posts_controller_1.getAllPosts);
router.get("/posts/:id", posts_controller_1.getPostById);
router.delete("/posts/:id", posts_controller_1.deletePostById);
router.post("/posts", posts_controller_1.createPost);
exports.default = router;
