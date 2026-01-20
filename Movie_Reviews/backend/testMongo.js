import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
    try {
        const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
        await client.connect();

        console.log("✅ MongoDB connected successfully!");

        const db = client.db(process.env.MOVIEREVIEWS_NS);
        const collections = await db.listCollections().toArray();

        console.log(`Collections in database "${process.env.MOVIEREVIEWS_NS}":`);
        collections.forEach(col => console.log(" -", col.name));

        await client.close();
        console.log("MongoDB connection closed.");
    } catch (e) {
        console.error("❌ MongoDB connection failed:", e);
    }
}

testConnection();
