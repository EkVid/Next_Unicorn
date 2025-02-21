import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.routes";
import commentRoutes from "./routes/comments.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = "mongodb+srv://support:7HowrRgu5IT3rApO@discussion-forum.q8ono.mongodb.net/"; // Update this to github secret
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any) // TypeScript workaround
    .then(async () => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", postRoutes);
app.use("/api", commentRoutes);

export default app;
