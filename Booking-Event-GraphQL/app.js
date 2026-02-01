// app.js
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Allow CORS from frontend
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true
}));

app.use(express.json());

// In-memory data
const users = [];
const events = [];
let userIdCounter = 1;
let eventIdCounter = 1;

// GraphQL schema
const schema = buildSchema(`
  type Event {
    id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type User {
    id: ID!
    email: String!
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
    login(email: String!, password: String!): AuthData
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    createEvent(eventInput: EventInput): Event
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

// Resolvers
const root = {
  events: () => events,

  login: async ({ email, password }) => {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('User does not exist.');

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error('Password is incorrect.');

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'somesecretkey',
      { expiresIn: '1h' }
    );

    return { userId: user.id, token, tokenExpiration: 3600 };
  },

  createUser: async ({ userInput }) => {
    if (users.find(u => u.email === userInput.email)) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const newUser = { id: userIdCounter++, email: userInput.email, password: hashedPassword };
    users.push(newUser);
    return { id: newUser.id, email: newUser.email };
  },

  createEvent: ({ eventInput }) => {
    const newEvent = { id: eventIdCounter++, ...eventInput };
    events.push(newEvent);
    return newEvent;
  }
};

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;