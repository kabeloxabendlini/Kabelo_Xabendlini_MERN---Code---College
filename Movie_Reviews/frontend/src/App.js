import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom"; // Routing
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";

// Components
import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import AddReview from "./components/AddReview";
import Login from "./components/Login";

function App() {
  // -----------------------------
  // State: current logged-in user
  // -----------------------------
  const [user, setUser] = useState(null);

  // Functions to log in/out
  const login = (user = null) => setUser(user); // Set user state
  const logout = () => setUser(null);           // Clear user state

  return (
    <div className="App">
      <Container>
        {/* ===========================
            Navbar
        =========================== */}
        <Navbar bg="light" expand="lg" className="mb-4">
          <Navbar.Brand>Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Link to Movies list */}
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>

              {/* Conditional Login/Logout */}
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

        {/* ===========================
            Routes
        =========================== */}
        <Switch>
          {/* Movies list page */}
          <Route exact path={["/", "/movies"]} component={MoviesList} />

          {/* Add or edit review page */}
          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          />

          {/* Movie detail page with reviews */}
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
