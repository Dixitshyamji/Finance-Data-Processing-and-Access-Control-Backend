require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const recordRoutes = require('./routes/recordRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Main Routes
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Centralized Error Handling Middleware (agar koi route match na ho)
app.use((req, res, next) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port  http://localhost:${PORT}`);
});