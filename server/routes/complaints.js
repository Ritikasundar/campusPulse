const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema
const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);

// GET all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new complaint
router.post('/', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update complaint
router.put('/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComplaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE complaint
router.delete('/:id', async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json({ message: 'Complaint deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
