const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  reporterName: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
