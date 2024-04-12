const mongoose = require('mongoose');

const matchDataSchema = new mongoose.Schema({
    date: { type: String, required: true },
    match: { type: String },
    players: [{
        name: { type: String, required: true },
        points: { type: Number, }
    }]
});

const MatchData = mongoose.model('MatchData', matchDataSchema);

module.exports = MatchData;