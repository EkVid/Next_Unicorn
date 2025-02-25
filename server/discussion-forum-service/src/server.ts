import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();
import "@dotenvx/dotenvx/config";
// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION!).then(() => {
  console.log("MongoDB connected to: " + process.env.MONGODB_CONNECTION);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
