// Import axios for making HTTP requests
import axios from "axios";

// Create a reusable axios instance with a base API URL
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/movies",
});

// Service class to handle all movie-related API calls
class MovieDataService {
  // Fetch all movies
  getAll() {
    return api.get("/");
  }

  // Fetch a single movie by its ID
  get(id) {
    return api.get(`/${id}`);
  }

  // Fetch all available movie ratings
  getRatings() {
    return api.get("/ratings");
  }

  // Search for movies using a query (e.g. title, genre, year)
  // Example: find("Inception", "title")
  find(query, by) {
    return api.get(`?${by}=${query}`);
  }

  // Create a new review for a specific movie
  // Expects data to include movie_id and review info
  createReview(data) {
    return api.post(`/${data.movie_id}/reviews`, data);
  }

  // Update an existing review for a specific movie
  updateReview(data) {
    return api.put(`/${data.movie_id}/reviews`, data);
  }

  // Delete a review using review ID and user ID
  deleteReview(reviewId, userId) {
    return api.delete("/reviews", {
      data: {
        review_id: reviewId,
        user_id: userId,
      },
    });
  }
}

// Create a single instance of the service
const movieDataService = new MovieDataService();

// Export the instance so it can be used throughout the app
export default movieDataService;
