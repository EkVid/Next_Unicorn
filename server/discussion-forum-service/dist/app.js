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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB connection
const MONGO_URI = "mongodb+srv://support:7HowrRgu5IT3rApO@discussion-forum.q8ono.mongodb.net/"; // Update this to github secret
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) // TypeScript workaround
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("MongoDB connected successfully");
}))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use("/api", posts_routes_1.default);
app.use("/api", comments_routes_1.default);
exports.default = app;
