import express from "express";
import cors from "cors";
import moviesRouter from "./api/movies.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", moviesRouter)
app.use("/api/v1/movies/review", moviesRouter)

// Express 5–safe 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;

