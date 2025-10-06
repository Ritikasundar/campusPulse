// server/models/Complaint.js
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },              // e.g., "Library", "Canteen"
  reporterName: { type: String },
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  status: { type: String, enum: ['open','in-progress','resolved'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
