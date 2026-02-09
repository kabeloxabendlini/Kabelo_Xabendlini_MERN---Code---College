import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

// Login component receives props from parent
// props.login → function to set the logged-in user in the parent state
// props.history → for programmatic navigation after login
const Login = (props) => {
  // Local state to store input values
  const [name, setName] = useState(""); // username input
  const [id, setId] = useState("");     // user ID input

  // Function to handle login button click
  const login = () => {
    // Pass user info up to parent component
    props.login({ name, id });

    // Redirect user to /movies page after login
    props.history.push("/movies");
  };

  return (
    <Form>
      {/* Username input */}
      <Form.Group className="mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={name}                       // bind state to input
          onChange={(e) => setName(e.target.value)} // update state on change
        />
      </Form.Group>

      {/* User ID input */}
      <Form.Group className="mb-2">
        <Form.Label>ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ID"
          value={id}                         // bind state to input
          onChange={(e) => setId(e.target.value)} // update state on change
        />
      </Form.Group>

      {/* Submit button triggers login function */}
      <Button onClick={login}>Submit</Button>
    </Form>
  );
};

export default Login;
