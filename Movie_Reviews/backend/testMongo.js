// Import MongoDB native driver and dotenv for environment variables
import mongodb from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Async function to test MongoDB connection
async function testConnection() {
    try {
        // Create a new MongoClient using your connection string from .env
        const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

        // Connect to MongoDB Atlas
        await client.connect();
        console.log("✅ MongoDB connected successfully!");

        // Select the database specified in .env
        const db = client.db(process.env.MOVIEREVIEWS_NS);

        // List all collections in the database
        const collections = await db.listCollections().toArray();
        console.log(`Collections in database "${process.env.MOVIEREVIEWS_NS}":`);

        // Print each collection name
        collections.forEach(col => console.log(" -", col.name));

        // Close the MongoDB connection
        await client.close();
        console.log("MongoDB connection closed.");

    } catch (e) {
        // Handle connection or query errors
        console.error("❌ MongoDB connection failed:", e);
    }
}

// Run the connection test
testConnection();
