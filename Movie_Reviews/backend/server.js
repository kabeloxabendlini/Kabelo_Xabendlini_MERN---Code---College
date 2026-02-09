// Import necessary modules
import express from "express";       // Express framework
import cors from "cors";             // CORS middleware to allow cross-origin requests
import moviesRouter from "./api/movies.route.js"; // Import router for movies & reviews

// Initialize Express app
const app = express();

// -----------------------------
// Middleware
// -----------------------------

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests automatically
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------

// Mount moviesRouter for movie-related routes
// Base URL: /api/v1/movies
app.use("/api/v1/movies", moviesRouter);

// ⚠️ NOTE: This line mounts the same moviesRouter for /api/v1/movies/review
// This is redundant because reviews routes are already included in moviesRouter
// Ideally, you only need:
// app.use("/api/v1/movies", moviesRouter)
app.use("/api/v1/movies/review", moviesRouter);

// -----------------------------
// 404 Handler
// -----------------------------

// Catch-all for unmatched routes (Express 5 safe)
// Returns JSON error instead of default HTML 404 page
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

// Export the Express app
export default app;
