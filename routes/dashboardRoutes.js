const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/dashboardController');
const { authorize } = require('../middleware/auth');

// Viewer, Analyst, aur Admin sab dashboard dekh sakte hain
router.get('/summary', authorize('Viewer', 'Analyst', 'Admin'), getSummary);

module.exports = router;