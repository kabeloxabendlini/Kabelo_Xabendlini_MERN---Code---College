import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import app from "./app.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MOVIEREVIEWS_DB_URI;

if (!DB_URI) {
  console.error("❌ MOVIEREVIEWS_DB_URI is missing in .env");
  process.exit(1);
}

async function startServer() {
  try {
    // Connect to MongoDB
    const client = new MongoClient(DB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    // Inject DB connection into DAOs
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

// Call the async function
startServer();