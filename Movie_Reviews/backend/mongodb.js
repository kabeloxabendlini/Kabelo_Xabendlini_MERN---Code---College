// mongodb.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.MOVIEREVIEWS_DB_URI;
const client = new MongoClient(DB_URI);

let moviesCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");
    const db = client.db("movieDB"); // replace with your DB name
    moviesCollection = db.collection("movies");
  } catch (err) {
    console.error(err);
  }
}

function getMoviesCollection() {
  if (!moviesCollection) throw new Error("Movies collection not initialized");
  return moviesCollection;
}

export { connectDB, getMoviesCollection };