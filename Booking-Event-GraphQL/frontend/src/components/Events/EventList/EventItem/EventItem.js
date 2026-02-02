import React, { Component } from 'react';
import './EventItem.css';
import AuthContext from '../../../../context/auth-context';

class EventItem extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <li className="events__list-item">
        <div>
          <h1>{this.props.title}</h1>
          <h2>
            R{this.props.price} –{' '}
            {new Date(this.props.date).toLocaleDateString()}
          </h2>
        </div>
        <div>
          <button onClick={this.props.onDetail}>View Details</button>
        </div>
      </li>
    );
  }
}

export default EventItem;
