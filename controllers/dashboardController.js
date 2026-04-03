const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
    try {
        const summary = await Record.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        let income = 0;
        let expense = 0;

        summary.forEach(item => {
            if (item._id === 'income') income = item.totalAmount;
            if (item._id === 'expense') expense = item.totalAmount;
        });

        res.status(200).json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense
        });
    } catch (error) {
        res.status(500).json({ error: 'Server Error while calculating summary' });
    }
};