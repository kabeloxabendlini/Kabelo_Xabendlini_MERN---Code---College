import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

// Components
import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import AddReview from "./components/AddReview";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Container>
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className="mb-4">
          <Navbar.Brand>Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              {user ? (
                <Nav.Link onClick={logout}>Logout User</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Routes */}
        <Switch>
          {/* Movies list */}
          <Route exact path={["/", "/movies"]}>
            <MoviesList />
          </Route>

          {/* Add or edit review */}
          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />

          {/* Movie detail page */}
          <Route
            path="/movies/:id"
            render={(props) => <Movie {...props} user={user} />}
          />

          {/* Login page */}
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
