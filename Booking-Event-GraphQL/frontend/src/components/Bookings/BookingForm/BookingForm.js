import React, { useState } from "react";

const BookingForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation {
        createEvent(eventInput: { title: "${title}", description: "${description}" }) {
          id
          title
          description
        }
      }
    `;

    try {
      const res = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      });

      const data = await res.json();
      if (data.errors) {
        setMessage("Failed to create event");
        console.error(data.errors);
        return;
      }

      setMessage("Event created successfully!");
      setTitle("");
      setDescription("");
      if (onCreate) onCreate(data.data.createEvent); // notify parent
    } catch (err) {
      console.error("Network error:", err);
      setMessage("Network error: Could not reach server");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Event</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default BookingForm;
