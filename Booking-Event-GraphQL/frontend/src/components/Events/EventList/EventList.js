import React from "react";
import EventItem from './EventItem/EventItem';
import "./EventList.css";

const EventList = ({ events, onViewDetail }) => {
  if (!events || events.length === 0) {
    return <p style={{ textAlign: 'center' }}>No events found.</p>;
  }

  return (
    <ul className="event__list">
      {events.map(event => (
        <EventItem
          key={event.id}
          eventId={event.id}
          title={event.title}
          price={event.price}
          date={event.date}
          onDetail={() => onViewDetail(event.id)}
        />
      ))}
    </ul>
  );
};

export default EventList;

