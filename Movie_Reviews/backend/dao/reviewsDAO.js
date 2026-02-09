// Import MongoDB package
import mongodb from "mongodb";

// Extract ObjectId to work with MongoDB document IDs
const ObjectId = mongodb.ObjectId;

// Variable to hold the reviews collection reference
let reviews;

// DAO class for the "reviews" collection
// Handles all database operations related to reviews
export default class ReviewsDAO {

  // Injects the database connection when the server starts
  // Ensures the collection handle is available for all DAO methods
  static async injectDB(conn) {

    // If the collection reference already exists, do nothing
    if (reviews) return;

    try {
      // Connect to the "reviews" collection in the specified database
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");

    } catch (e) {
      // Log errors if unable to establish the collection handle
      console.error(`Unable to establish collection handle in ReviewsDAO: ${e}`);
    }
  }

  // Fetch all reviews for a specific movie by its ID
  static async getReviewsByMovieId(movieId) {
    try {
      // Convert string ID to ObjectId and find all matching reviews
      return await reviews
        .find({ movie_id: new ObjectId(movieId) })
        .toArray();

    } catch (e) {
      // Return empty array on failure and log error
      console.error(`Unable to get reviews: ${e}`);
      return [];
    }
  }

  // Add a new review for a movie
  static async addReview(movieId, user, review, date) {
    try {
      // Build the review document
      const reviewDoc = {
        name: user.name,                     // Reviewer's name
        user_id: user._id,                   // Reviewer's user ID
        date,                                // Review date
        review,                              // Review text
        movie_id: new ObjectId(movieId),     // Reference to the movie
      };

      // Insert the review into the collection
      return await reviews.insertOne(reviewDoc);

    } catch (e) {
      // Return an error object if insertion fails
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // Update an existing review
  static async updateReview(reviewId, userId, review, date) {
    try {
      // Only allow the user who created the review to update it
      return await reviews.updateOne(
        { _id: new ObjectId(reviewId), user_id: userId },
        { $set: { review, date } }          // Update the review text and date
      );

    } catch (e) {
      // Return an error object if update fails
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // Delete a review
  static async deleteReview(reviewId, userId) {
    try {
      // Only allow the user who created the review to delete it
      return await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

    } catch (e) {
      // Return an error object if deletion fails
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
