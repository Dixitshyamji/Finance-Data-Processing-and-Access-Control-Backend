const Record = require('../models/Record');

// Create a new record
exports.createRecord = async (req, res) => {
    try {
        const { amount, type, category, date, notes } = req.body;
        if (!amount || !type || !category) {
            return res.status(400).json({ error: 'Amount, type, and category are required' });
        }
        
        const record = await Record.create({ amount, type, category, date, notes });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Server Error while creating record' });
    }
};

// Get all records with optional filtering
exports.getRecords = async (req, res) => {
    try {
        const { type, category } = req.query;
        let query = {};
        
        if (type) query.type = type;
        if (category) query.category = category;

        const records = await Record.find(query).sort({ date: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server Error while fetching records' });
    }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ error: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error while deleting record' });
    }
};