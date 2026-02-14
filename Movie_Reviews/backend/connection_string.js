// Import required modules
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ Please set your MONGO_URI in a .env file");
  process.exit(1);
}

// Create MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Async function to test the connection
async function run() {
  try {
    await client.connect();

    // Ping the database to confirm connection
    await client.db("admin").command({ ping: 1 });

    console.log("✅ Successfully connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

// Run connection test
run();
