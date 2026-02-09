import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";              // Bootstrap UI components
import { Link, useParams, useLocation, useHistory } from "react-router-dom"; // Router hooks
import MovieDataService from "../services/movies";          // Service for API calls

// AddReview component receives `user` prop to identify logged-in user
const AddReview = ({ user }) => {
  // Get movieId from URL parameters
  const { id: movieId } = useParams();

  // Get location state (used for passing current review when editing)
  const location = useLocation();

  // History object to programmatically navigate
  const history = useHistory();

  // Determine if the component is in edit mode
  const currentReview = location.state?.currentReview || null;
  const editing = Boolean(currentReview?._id);

  // React state
  const [review, setReview] = useState(currentReview?.review ?? ""); // Input value
  const [submitted, setSubmitted] = useState(false);                  // Submission flag
  const [error, setError] = useState("");                              // Error message

  // Guard: user must be logged in
  if (!user) {
    return <p>Please log in to add or edit a review.</p>;
  }

  // Function to save the review (create or update)
  const saveReview = async () => {
    if (!review.trim()) {
      setError("Review cannot be empty.");  // Validation: prevent empty reviews
      return;
    }

    try {
      // Build the payload
      const data = {
        review: review.trim(),
        name: user.name,
        user_id: user.id,
        movie_id: movieId,
      };

      if (editing) {
        data.review_id = currentReview._id;  // Add review ID for updating
        await MovieDataService.updateReview(data); // API call to update
      } else {
        await MovieDataService.createReview(data); // API call to create
      }

      // Mark submission as complete
      setSubmitted(true);

      // Redirect back to movie page after a short delay
      setTimeout(() => {
        history.push(`/movies/${movieId}`);
      }, 1000);

    } catch (e) {
      console.error("Error saving review:", e);
      setError("Failed to save review. Please try again."); // Show user-friendly error
    }
  };

  return (
    <div className="mt-4">
      {submitted ? (
        // Show success message after submission
        <h4>Review submitted successfully!</h4>
      ) : (
        // Render the review form
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              {editing ? "Edit Review" : "Create Review"}
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={(e) => setReview(e.target.value)} // Update state as user types
            />
          </Form.Group>

          {/* Display validation or submission errors */}
          {error && <p className="text-danger">{error}</p>}

          {/* Submit button triggers saveReview */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              saveReview();
            }}
          >
            Submit
          </Button>{" "}
          
          {/* Cancel button navigates back to movie page */}
          <Link to={`/movies/${movieId}`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
