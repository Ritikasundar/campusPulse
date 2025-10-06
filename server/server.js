require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const complaintsRouter = require('./routes/complaints');

const app = express();

// ---------- CORS Configuration ----------
const corsOptions = {
  origin: 'https://campus-pulse-red.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// ---------- Middleware ----------
app.use(express.json());

// ---------- MongoDB Connection ----------
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusPulse';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// ---------- Routes ----------
app.use('/api/complaints', complaintsRouter);

// ---------- Health Check ----------
app.get('/', (req, res) => {
  res.send('CampusPulse Backend is running!');
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
