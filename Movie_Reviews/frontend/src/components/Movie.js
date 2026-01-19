import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";

/**
 * Inline fallback image to avoid broken image errors
 */
const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="450">
      <rect width="100%" height="100%" fill="#ddd"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-size="20" fill="#555">No Image</text>
    </svg>
  `);

const Movie = ({ match, user }) => {
  /**
   * ALWAYS initialize arrays as []
   */
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    plot: "",
    rated: "",
    poster: "",
    reviews: [],
  });

  /**
   * Fetch a movie safely and normalize response data
   */
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((res) => {
        const data = res?.data || {};

        setMovie({
          id: data._id ?? null,
          title: data.title ?? "",
          plot: data.plot ?? "",
          rated: data.rated ?? "",
          poster: data.poster ?? "",
          reviews: Array.isArray(data.reviews) ? data.reviews : [],
        });
      })
      .catch((e) => console.error("Error loading movie:", e));
  };

  useEffect(() => {
    if (match?.params?.id) {
      getMovie(match.params.id);
    }
  }, [match]);

  /**
   * Delete review safely
   */
  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, user.id)
      .then(() => {
        setMovie((prevMovie) => ({
          ...prevMovie,
          reviews: prevMovie.reviews.filter((_, i) => i !== index),
        }));
      })
      .catch((e) => console.error("Error deleting review:", e));
  };

  /**
   * Handle broken poster URLs
   */
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image
            src={movie.poster || FALLBACK_IMAGE}
            fluid
            onError={handleImageError}
          />
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              <Card.Text>
                <strong>Rating:</strong> {movie.rated || "Not Rated"}
              </Card.Text>

              {user && (
                <Link to={`/movies/${match.params.id}/review`}>
                  Add Review
                </Link>
              )}
            </Card.Body>
          </Card>

          <h2 className="mt-4">Reviews</h2>

          {movie.reviews?.length > 0 ? (
            <ListGroup className="mt-3">
              {movie.reviews.map((review, index) => (
                <ListGroup.Item key={review._id || index}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {review.name} reviewed on {review.date}
                      </Card.Title>

                      <Card.Text>{review.review}</Card.Text>

                      {user && user.id === review.user_id && (
                        <Row>
                          <Col>
                            <Link
                              to={{
                                pathname: `/movies/${match.params.id}/review`,
                                state: { currentReview: review },
                              }}
                            >
                              Edit
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              variant="link"
                              onClick={() =>
                                deleteReview(review._id, index)
                              }
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No reviews yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
