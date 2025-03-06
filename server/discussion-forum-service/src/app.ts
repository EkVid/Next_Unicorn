import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.routes";
import commentRoutes from "./routes/comments.routes";
import swaggerUi from "swagger-ui-express";
import openApiSpec from "../swagger.json";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(openApiSpec));
export default app;
