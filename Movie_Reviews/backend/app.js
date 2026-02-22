// Import necessary modules
import express from "express";   // Express framework for handling HTTP requests
import mongoose from "mongoose"; // Mongoose ODM for MongoDB
import dotenv from "dotenv";     // Load environment variables from .env

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// -----------------------------
// Middleware
// -----------------------------

// Parses incoming JSON requests and puts the data in req.body
app.use(express.json());

// -----------------------------
// Environment variables
// -----------------------------
const PORT = process.env.PORT || 5000;             // Port for server to listen on
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;   // MongoDB connection URI from .env

// -----------------------------
// Safety check
// -----------------------------
if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing in .env");
  process.exit(1); // Stop the app if DB URI is missing
}

// -----------------------------
// MongoDB connection & server start
// -----------------------------
async function startServer() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000, // 5-second timeout for server selection
    });

    console.log("✅ Connected to MongoDB Atlas");

    // Start Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    // Handle connection errors
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process if DB connection fails
  }
}

// Start the server
startServer();

// Export the app for testing or modular usage
export default app;
