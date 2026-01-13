import express from "express"
import cors from "cors"
import moviesRouter from "./api/movies.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/movies", moviesRouter)

// ✅ Express 5–safe 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "not found" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
