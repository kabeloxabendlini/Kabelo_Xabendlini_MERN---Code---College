// Load environment variables
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from "mongodb";


// MongoDB Atlas connection URI
// Replace <db_password> with your actual database password
const uri = mongodb+srv://<username>:<password>@cleanblogcluster.3dcqxws.mongodb.net/?appName=CleanBlogCluster

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
  }
});

// Async function to test the connection
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

// Run the connection test
run();
