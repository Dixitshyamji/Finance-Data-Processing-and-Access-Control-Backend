const express = require('express');
const router = express.Router();
const { createRecord, getRecords, deleteRecord } = require('../controllers/recordController');
const { authorize } = require('../middleware/auth');

// Analyst aur Admin dono dekh sakte hain
router.get('/', authorize('Analyst', 'Admin'), getRecords);

// Sirf Admin create aur delete kar sakta hai
router.post('/', authorize('Admin'), createRecord);
router.delete('/:id', authorize('Admin'), deleteRecord);

module.exports = router;