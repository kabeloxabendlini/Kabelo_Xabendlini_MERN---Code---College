import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Welcome To MERN Stack Tutorial'));
app.use('/books', booksRoute);

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('✅ App connected to database');
    app.listen(PORT, () => console.log(`🚀 App listening on port ${PORT}`));
  })
  .catch(err => console.error(err));
