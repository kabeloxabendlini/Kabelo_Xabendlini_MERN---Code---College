// Import the Reviews Data Access Object (DAO)
// This file handles all database operations related to reviews
import ReviewsDAO from "../dao/reviewsDAO.js";

// Controller class responsible for handling review-related HTTP requests
export default class ReviewsController {

  // POST /api/v1/movies/review
  // Creates and stores a new review in the database
  static async apiPostReview(req, res) {
    try {
      // Destructure required values from the request body
      const { movie_id, review, name, user_id } = req.body;

      // Create a user info object to associate the review with a user
      const userInfo = {
        name,
        _id: user_id,
      };

      // Capture the date when the review is created
      const date = new Date();

      // Call DAO method to insert the review into the database
      await ReviewsDAO.addReview(movie_id, userInfo, review, date);

      // Send success response to the client
      res.json({ status: "success" });

    } catch (e) {
      // Handle server or database errors
      res.status(500).json({ error: e.message });
    }
  }

  // PUT /api/v1/movies/review
  // Updates an existing review
  static async apiUpdateReview(req, res) {
    try {
      // Extract review ID, user ID, and new review text
      const { review_id, user_id, review } = req.body;

      // Update the review date to the current time
      const date = new Date();

      // Call DAO method to update the review
      const response = await ReviewsDAO.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      // If DAO returns an error, send a bad request response
      if (response.error) {
        return res.status(400).json(response);
      }

      // If no documents were modified, the user is likely not the author
      if (response.modifiedCount === 0) {
        throw new Error(
          "Unable to update review. User may not be original poster."
        );
      }

      // Send success response
      res.json({ status: "success" });

    } catch (e) {
      // Handle errors such as authorization or database failures
      res.status(500).json({ error: e.message });
    }
  }

  // DELETE /api/v1/movies/review
  // Deletes a review from the database
  static async apiDeleteReview(req, res) {
    try {
      // Extract the review ID and user ID from request body
      const { review_id, user_id } = req.body;

      // Call DAO method to delete the review
      await ReviewsDAO.deleteReview(review_id, user_id);

      // Send success response
      res.json({ status: "success" });

    } catch (e) {
      // Handle server or database errors
      res.status(500).json({ error: e.message });
    }
  }
}

/*
====================================
 Example Axios API calls (testing)
====================================

// Create a new review
axios.post("http://localhost:5000/api/v1/movies/review", data);

// Update an existing review
axios.put("http://localhost:5000/api/v1/movies/review", data);

// Delete a review
axios.delete("http://localhost:5000/api/v1/movies/review", { data: data });

*/
