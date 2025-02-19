import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.routes";
import commentRoutes from "./routes/comments.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", postRoutes);
app.use("/api", commentRoutes);

// Testing URL
// app.get("/", (req, res) => {
//     res.send("Hello, MongoDB with Express and TypeScript!");
// });

export default app;