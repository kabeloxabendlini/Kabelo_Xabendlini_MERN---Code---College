import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingsChart from '../components/Bookings/BookingsChart/BookingsChart';
import BookingsControls from '../components/Bookings/BookingsControls/BookingsControls';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = async () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          bookings {
            id
            createdAt
            event {
              id
              title
              date
              price
            }
          }
        }
      `
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
        console.error('Bookings fetch failed:', resData.errors);
        this.setState({ isLoading: false });
        return;
      }

      this.setState({ bookings: resData.data.bookings, isLoading: false });
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false });
    }
  };

  deleteBookingHandler = async bookingId => {
    this.setState({ isLoading: true });

    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            id
            title
          }
        }
      `,
      variables: { id: bookingId }
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
        console.error('Cancel booking failed:', resData.errors);
        this.setState({ isLoading: false });
        return;
      }

      const updatedBookings = this.state.bookings.filter(b => b.id !== bookingId);
      this.setState({ bookings: updatedBookings, isLoading: false });
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false });
    }
  };

  changeOutputTypeHandler = outputType => {
    this.setState({ outputType });
  };

  render() {
    let content = <Spinner />;

    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingsControls
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === 'list' ? (
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            ) : (
              <BookingsChart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;
