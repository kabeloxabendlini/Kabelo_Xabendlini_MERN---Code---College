// Import Express to create routes
import express from "express";

// Import controller logic for movies
import MoviesController from "./movies.controller.js";

// Import controller logic for reviews
import ReviewsController from "./reviews.controller.js";

// Create a new router instance
const router = express.Router();

/**
 * -----------------------------
 * Movies routes
 * Base path: /api/v1/movies
 * -----------------------------
 */

// GET /api/v1/movies
// Returns a list of movies (supports pagination and filtering)
router.route("/")
  .get(MoviesController.apiGetMovies);

// GET /api/v1/movies/ratings
// Returns all available movie ratings (e.g. PG, R, G)
router.route("/ratings")
  .get(MoviesController.apiGetRatings);

// GET /api/v1/movies/:id
// Returns a single movie based on its unique ID
router.route("/:id")
  .get(MoviesController.apiGetMovieById);

/**
 * -----------------------------
 * Reviews routes
 * Base path: /api/v1/movies/review
 * -----------------------------
 */

// POST /api/v1/movies/review
// Creates a new review for a movie

// PUT /api/v1/movies/review
// Updates an existing review

// DELETE /api/v1/movies/review
// Deletes a review
router.route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

// Export the router so it can be used in the main server file
export default router;
