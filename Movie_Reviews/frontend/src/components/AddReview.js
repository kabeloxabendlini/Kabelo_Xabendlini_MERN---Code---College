import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import MovieDataService from "../services/movies";

const AddReview = ({ user }) => {
  const { id: movieId } = useParams();           // get movie ID from URL
  const location = useLocation();                // get state from navigation
  const currentReview = location.state?.currentReview;

  const editing = !!currentReview;
  const [review, setReview] = useState(currentReview?.review || "");
  const [submitted, setSubmitted] = useState(false);

  const saveReview = () => {
    const data = {
      review,
      name: user.name,
      user_id: user.id,
      movie_id: movieId,
    };

    if (editing) data.review_id = currentReview._id;

    const action = editing
      ? MovieDataService.updateReview(data)
      : MovieDataService.createReview(data);

    action
      .then(() => setSubmitted(true))
      .catch((e) => console.error(e));
  };

  return (
    <div className="mt-4">
      {submitted ? (
        <div>
          <h4>Review submitted successfully!</h4>
          <Link to={`/movies/${movieId}`}>
            <Button variant="primary">Back to Movie</Button>
          </Link>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={(e) => {
              e.preventDefault();
              saveReview();
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;

