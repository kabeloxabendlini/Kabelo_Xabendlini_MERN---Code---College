import React from 'react';
import './BookingList.css';

const BookingList = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="booking-empty">
        <p>No bookings yet.</p>
        <p>Click "Add Event" to create your first booking!</p>
      </div>
    );
  }

  return (
    <ul className="booking-list">
      {bookings.map(booking => (
        <li key={booking.id} className="booking-list-item">
          <div className="booking-info">
            <h2>{booking.title}</h2>
            <p>{new Date(booking.date).toLocaleString()}</p>
          </div>
          <div className="booking-actions">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-secondary">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
