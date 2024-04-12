const MatchData = require('../models/matchdata');
const PlayerTotal = require('../models/PlayerTotal');
const  MatchDetailsForAllMatches  = require('./LeadTable.controller');
exports.Stats = async (req, res, next) => {
        const MatchDetails = MatchDetailsForAllMatches.MatchDetailsForAllMatches()
        console.log(MatchDetails);
        const  Matdata = await MatchData.find(); 
        const  Pladata = await PlayerTotal.find(); 
        const sortdata = await PlayerTotal.find().sort({ totalPoints: -1 }); 
            res.render("Stats", { Matdata: Matdata,Pladata: Pladata})
    }