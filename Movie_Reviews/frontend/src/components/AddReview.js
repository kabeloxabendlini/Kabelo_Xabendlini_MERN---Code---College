import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import MovieDataService from "../services/movies";

const AddReview = ({ user }) => {
  const { id: movieId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const currentReview = location.state?.currentReview;
  const editing = !!currentReview;

  const [review, setReview] = useState(currentReview?.review || "");
  const [submitted, setSubmitted] = useState(false);

  const saveReview = async () => {
    try {
      const data = {
        review,
        name: user.name,
        user_id: user.id,
        movie_id: movieId,
      };

      if (editing) data.review_id = currentReview._id;

      if (editing) await MovieDataService.updateReview(data);
      else await MovieDataService.createReview(data);

      setSubmitted(true);

      // Redirect after 1s
      setTimeout(() => history.push(`/movies/${movieId}`), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-4">
      {submitted ? (
        <h4>Review submitted successfully!</h4>
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