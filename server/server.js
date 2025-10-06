require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const complaintsRouter = require('./routes/complaints');

const app = express();

// CORS: allow your deployed frontend domain
app.use(cors({
  origin: 'https://campus-pulse-red.vercel.app', // your Vercel frontend
  credentials: true
}));

// JSON middleware
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Mongo URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/complaints', complaintsRouter);

// Health check
app.get('/', (req, res) => res.send('CampusPulse backend running!'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
