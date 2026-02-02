import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import EventList from '../components/Events/EventList/EventList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './EventsPage.css';

class EventsPage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
    selectedEvent: null
  };

  isActive = true;
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = async () => {
    this.setState({ creating: false });

    const title = this.titleElRef.current.value.trim();
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value.trim();

    if (!title || !price || !date || !description) return;

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $desc: String!, $price: Float!, $date: String!) {
          createEvent(eventInput: {title: $title, description: $desc, price: $price, date: $date}) {
            id
            title
            description
            price
            date
          }
        }
      `,
      variables: { title, desc: description, price, date }
    };

    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token
        }
      });

      const resData = await res.json();

      if (resData.errors) {
        console.error(resData.errors);
        alert(resData.errors[0].message);
        return;
      }

      const newEvent = resData.data.createEvent;

      this.setState(prevState => ({
        events: [...prevState.events, newEvent]
      }));
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchEvents = async () => {
    this.setState({ isLoading: true });

    const requestBody = {
      query: `
        query {
          events {
            id
            title
            description
            date
            price
          }
        }
      `
    };

    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const resData = await res.json();

      if (resData.errors) {
        console.error('Events fetch failed:', resData.errors);
        this.setState({ isLoading: false });
        return;
      }

      if (this.isActive) {
        this.setState({ events: resData.data.events, isLoading: false });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (this.isActive) this.setState({ isLoading: false });
    }
  };

  showDetailHandler = eventId => {
    this.setState(prevState => ({
      selectedEvent: prevState.events.find(e => e.id === eventId)
    }));
  };

  bookEventHandler = async () => {
    if (!this.context.token || !this.state.selectedEvent) {
      this.setState({ selectedEvent: null });
      return;
    }

    const requestBody = {
      query: `
        mutation BookEvent($id: ID!) {
          bookEvent(eventId: $id) {
            id
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id: this.state.selectedEvent.id }
    };

    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token
        }
      });

      const resData = await res.json();

      if (resData.errors) {
        console.error('Booking failed:', resData.errors);
        alert(resData.errors[0].message);
        return;
      }

      this.setState({ selectedEvent: null });
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedEvent) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4" ref={this.descriptionElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>
              ${this.state.selectedEvent.price} –{' '}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Share your own Events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.events}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EventsPage;


            