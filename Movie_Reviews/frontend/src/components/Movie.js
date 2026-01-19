import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieDataService from "../services/movies";

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
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    plot: "",
    rated: "",
    poster: "",
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((res) => setMovie(res.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getMovie(match.params.id);
  }, [match.params.id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, user.id)
      .then(() => {
        const updatedReviews = [...movie.reviews];
        updatedReviews.splice(index, 1);
        setMovie({ ...movie, reviews: updatedReviews });
      })
      .catch((e) => console.error(e));
  };

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
              <Card.Text>Rating: {movie.rated}</Card.Text>
              {user && (
                <Link to={`/movies/${match.params.id}/review`}>
                  Add Review
                </Link>
              )}
            </Card.Body>
          </Card>

          <h2 className="mt-4">Reviews</h2>

          {movie.reviews.length ? (
            <ListGroup className="mt-3">
              {movie.reviews.map((review, index) => (
                <ListGroup.Item key={index}>
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
                              onClick={() => deleteReview(review._id, index)}
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

