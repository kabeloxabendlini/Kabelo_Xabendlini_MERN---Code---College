import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const login = () => {
    props.login({ name, id });
    props.history.push("/movies"); // redirect after login
  };

  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Form.Group>
      <Button onClick={login}>Submit</Button>
    </Form>
  );
};

export default Login;
