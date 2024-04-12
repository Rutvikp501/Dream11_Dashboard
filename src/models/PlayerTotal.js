const mongoose = require('mongoose');

const playerTotalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalPoints: { type: Number, required: true }
});

const PlayerTotal = mongoose.model('PlayerTotal', playerTotalSchema);

module.exports = PlayerTotal;