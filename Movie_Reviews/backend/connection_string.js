// Load environment variables
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDB Atlas connection URI
// Replace <db_password> with your actual database password
const uri = mongodb+srv://<username>:<password>@cleanblogcluster.3dcqxws.mongodb.net/?appName=CleanBlogCluster


// Create a MongoClient instance with Stable API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,   // Use MongoDB Stable API v1
    strict: true,                   // Enforce strict API rules
    deprecationErrors: true,        // Throw errors for deprecated commands
  }
});

// Async function to test the connection
async function run() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();

    // Send a ping command to confirm connection is successful
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");

  } catch (err) {
    // Log any errors
    console.error("❌ Connection failed:", err);

  } finally {
    // Ensure the client is closed in all cases
    await client.close();
  }
}

// Run the connection test
run();
