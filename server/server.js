require('dotenv').config(); // load .env locally if needed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const complaintsRouter = require('./routes/complaints');

const app = express();

app.use(cors({ origin: 'https://campus-pulse-red.vercel.app' }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI; // ✅ must read from env
console.log('Mongo URI:', MONGODB_URI); // debug

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/api/complaints', complaintsRouter);

app.get('/', (req, res) => res.send('CampusPulse backend running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
