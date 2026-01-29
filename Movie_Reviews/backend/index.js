import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Env vars
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;

// Safety check
if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing in .env");
  process.exit(1);
}

// MongoDB connection
async function startServer() {
  try {
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();
export default app;