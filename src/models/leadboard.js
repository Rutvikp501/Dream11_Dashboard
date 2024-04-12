const mongoose = require('mongoose');

const total_pointsSchema = new mongoose.Schema({
    position: { type: Number, required: true },
    user_name: { type: String, required: true },
    points: { type: Number, required: true },
});

module.exports = mongoose.model('totalpoints', total_pointsSchema);