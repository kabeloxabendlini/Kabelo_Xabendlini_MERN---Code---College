import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import MovieDataService from "../services/movies";

const AddReview = ({ user }) => {
  const { id: movieId } = useParams();
  const location = useLocation();
  const history = useHistory();

  // Determine edit mode safely
  const currentReview = location.state?.currentReview || null;
  const editing = Boolean(currentReview?._id);

  const [review, setReview] = useState(currentReview?.review ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Guard: user must be logged in
  if (!user) {
    return <p>Please log in to add or edit a review.</p>;
  }

  const saveReview = async () => {
    if (!review.trim()) {
      setError("Review cannot be empty.");
      return;
    }

    try {
      const data = {
        review: review.trim(),
        name: user.name,
        user_id: user.id,
        movie_id: movieId,
      };

      if (editing) {
        data.review_id = currentReview._id;
        await MovieDataService.updateReview(data);
      } else {
        await MovieDataService.createReview(data);
      }

      setSubmitted(true);

      setTimeout(() => {
        history.push(`/movies/${movieId}`);
      }, 1000);
    } catch (e) {
      console.error("Error saving review:", e);
      setError("Failed to save review. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      {submitted ? (
        <h4>Review submitted successfully!</h4>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              {editing ? "Edit Review" : "Create Review"}
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button
            onClick={(e) => {
              e.preventDefault();
              saveReview();
            }}
          >
            Submit
          </Button>{" "}
          <Link to={`/movies/${movieId}`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
