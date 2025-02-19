import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5001;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});