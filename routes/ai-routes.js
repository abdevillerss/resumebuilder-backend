const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authmiddleware');

// This is the controller with the correct function names
const {
    improveWriting,
    getAtsScore,
    personalizeForJob
} = require('../controllers/ai-controller.js');

// --- THIS IS THE FIX ---
// The function names now match what is exported from the controller.
// I have also added the 'protect' middleware to secure these routes.

// Route for improving text
router.post('/improve', protect, improveWriting);

// Route for getting an ATS score
router.post('/atsscore', protect, getAtsScore);

// Route for personalizing a resume for a job
router.post('/personalize', protect, personalizeForJob);

module.exports = router;
