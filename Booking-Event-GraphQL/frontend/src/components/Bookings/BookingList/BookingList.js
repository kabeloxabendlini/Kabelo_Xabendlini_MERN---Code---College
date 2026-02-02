import React from "react";
import "./BookingList.css"; // optional CSS file

const BookingList = ({ bookings, onDelete }) => {
  if (!bookings || bookings.length === 0) {
    return <p style={{ textAlign: "center" }}>No bookings yet.</p>;
  }

  return (
    <ul className="bookings__list">
      {bookings.map((booking) => (
        <li key={booking.id} className="bookings__list-item">
          <div>
            <h2>{booking.event.title}</h2>
            <p>
              Price: ${booking.event.price} | Date:{" "}
              {new Date(booking.event.date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <button className="btn" onClick={() => onDelete(booking.id)}>
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;

