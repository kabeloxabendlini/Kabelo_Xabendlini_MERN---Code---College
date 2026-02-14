<<<<<<< HEAD
// Import required modules
=======
// Load environment variables
import 'dotenv/config';
>>>>>>> 27377828799ba055ae0079e5831a3438428b5335
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
:
<<<<<<< HEAD
// Load environment variables from .env file
dotenv.config();
=======
// MongoDB Atlas connection URI
// Replace <db_password> with your actual database password
const uri = mongodb+srv://<username>:<password>@cleanblogcluster.3dcqxws.mongodb.net/?appName=CleanBlogCluster

>>>>>>> 27377828799ba055ae0079e5831a3438428b5335

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
