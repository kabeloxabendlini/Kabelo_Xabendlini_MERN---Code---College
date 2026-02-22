// app.js
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

/* ------------------ CORS ------------------ */
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

/* ------------------ Body Parser ------------------ */
app.use(express.json());

/* ------------------ Auth Middleware ------------------ */
app.use((req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || 'supersecret'
    );
    req.isAuth = true;
    req.userId = decodedToken.userId;
  } catch (err) {
    req.isAuth = false;
  }
  next();
});

/* ------------------ In-Memory Data ------------------ */
const users = [];
const events = [];
const bookings = [];

let userIdCounter = 1;
let eventIdCounter = 1;
let bookingIdCounter = 1;

/* ------------------ GraphQL Schema ------------------ */
const schema = buildSchema(`
  type Event {
    id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type User {
    id: ID!
    email: String!
  }

  type Booking {
    id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInput): User!
    createEvent(eventInput: EventInput): Event!
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

/* ------------------ Resolvers ------------------ */
const root = {

  /* ------------------ Queries ------------------ */
  events: () => events,

  bookings: (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated!');
    return bookings.filter(b => b.user.id === req.userId);
  },

  login: async ({ email, password }) => {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('User does not exist.');

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error('Password is incorrect.');

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' }
    );

    return { userId: user.id, token, tokenExpiration: 3600 };
  },

  /* ------------------ Mutations ------------------ */
  createUser: async ({ userInput }) => {
    if (users.find(u => u.email === userInput.email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    const newUser = {
      id: String(userIdCounter++),
      email: userInput.email,
      password: hashedPassword
    };

    users.push(newUser);

    return { id: newUser.id, email: newUser.email };
  },

  createEvent: ({ eventInput }, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated!');

    const user = users.find(u => u.id === req.userId);
    if (!user) throw new Error('User not found');

    const newEvent = {
      id: String(eventIdCounter++),
      ...eventInput,
      creator: user
    };

    events.push(newEvent);
    return newEvent;
  },

  bookEvent: ({ eventId }, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated!');

    const event = events.find(e => e.id === eventId);
    if (!event) throw new Error('Event not found');

    const user = users.find(u => u.id === req.userId);

    const booking = {
      id: String(bookingIdCounter++),
      event,
      user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    bookings.push(booking);
    return booking;
  },

  cancelBooking: ({ bookingId }, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated!');

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) throw new Error('Booking not found');

    const booking = bookings[bookingIndex];
    bookings.splice(bookingIndex, 1);

    return booking.event;
  }
};

/* ------------------ GraphQL Endpoint ------------------ */
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

/* ------------------ Start Server ------------------ */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});