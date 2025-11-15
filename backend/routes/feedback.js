const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');


// Create feedback
router.post('/', async (req, res) => {
try {
const { name, email, message, rating } = req.body;
const fb = new Feedback({ name, email, message, rating });
await fb.save();
res.status(201).json({ success: true, feedback: fb });
} catch (err) {
console.error(err);
res.status(500).json({ success: false, error: 'Server error' });
}
});


// Get all feedbacks (paginated optional)
router.get('/', async (req, res) => {
try {
const feedbacks = await Feedback.find().sort({ createdAt: -1 });
res.json({ success: true, feedbacks });
} catch (err) {
console.error(err);
res.status(500).json({ success: false, error: 'Server error' });
}
});


// Delete feedback by id (admin)
router.delete('/:id', async (req, res) => {
try {
const id = req.params.id;
await Feedback.findByIdAndDelete(id);
res.json({ success: true });
} catch (err) {
console.error(err);
res.status(500).json({ success: false, error: 'Server error' });
}
});


module.exports = router;