
const MatchData = require('../models/matchdata');
const PlayerTotal = require('../models/PlayerTotal');


exports.Leadtable = async (req, res, next) => {
    SortmatchesData()
    MatchDetailsForAllMatches()
    const data =await MatchDetailsForAllMatches(); 
    const sortdata = await PlayerTotal.find().sort({ totalPoints: -1 }); 

    //console.log(sortdata);
    res.render("Leadtable",{ data: sortdata })
}

exports.AllData = async (req, res, next) => {
    SortmatchesData()
    //MatchDetailsForAllMatches()
    const data = await MatchDetailsForAllMatches(); 
    const sortdata = await PlayerTotal.find().sort({ totalPoints: -1 }); 

    //console.log(data);
    res.render("AllData",{ data: data })
}

exports.Stats = async (req, res, next) => {
    try {
        const MatchDetails = await MatchDetailsForAllMatches();
        const Matdata = await MatchData.find(); 
        const Pladata = await PlayerTotal.find(); 
        res.render("Stats", { Matdata: Matdata, Pladata: Pladata, MatchDetails: MatchDetails });
    } catch (error) {
        console.error('Error rendering Stats:', error);
        res.status(500).send('Internal Server Error');
    }
}



exports.Getdata =  async (req, res) => {
    try {
        // Fetch data from the database using your Mongoose model
        const data = await totalpointsModel.find();

        // Send the fetched data as a JSON response
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.fileupload = async (req, res, next) => {
    try {
         const data = await MatchData.find(); 
         res.render("fileupload", { data: data });
        // res.render("fileupload");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.ExcelToJson = async (req, res, next) => {
    try {
        const jsonData = req.body; // Assuming req.body contains the JSON data from frontend
        const sheetData = jsonData.Sheet1; // Assuming the data is in Sheet1
        console.log(sheetData);
        
        // Loop through the data and save each entry to the database
        for (const entry of sheetData) {
            const { Pos, Team, Points } = entry; // Assuming Pos corresponds to pos
            
            // Create a new instance of the Mongoose model with the extracted data
            const newData = new totalpointsModel({
                position: Pos,
                user_name: Team,
                points: Points
            });
            
            // Save the new entry to the database
            console.log(newData);
            await newData.save();
        }
        
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.UpdatePoints = async (req, res, next) => {
    try {
        const jsonData = req.body; // Assuming req.body contains the JSON data from frontend
        const sheetData = jsonData.Sheet1; // Assuming the data is in Sheet1
        console.log(sheetData);
        // Iterate through the data
        for (const entry of sheetData) {
            const { Team, Points } = entry;

            // Check if the user already exists in the database
            const existingUser = await totalpointsModel.findOne({ user_name: Team });

            if (existingUser) {
                // Update points for existing user
                existingUser.points = Points;
                await existingUser.save();
            } else {
                // Create new entry for the user
                const newUser = new totalpointsModel({
                    user_name: Team,
                    points: Points,
                    total_points: Points // Assuming 'total_points' should initially be the same as 'Points'
                });
                await newUser.save();
            }
        }

        // Sort users by points in descending order
        const sortedUsers = await totalpointsModel.find().sort({ points: -1 });

        // Update positions (pos)
        let pos = 1;
        for (const user of sortedUsers) {
            user.pos = pos;
            await user.save();
            pos++;
        }

        res.status(200).send('Points updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



exports.insertMatchData = async (req, res, next) => {
    const jsonData = req.body;
    try {
        for (const sheetName in jsonData) {
            if (jsonData.hasOwnProperty(sheetName)) {
                const sheetData = jsonData[sheetName];
                for (const entry of sheetData) {
                    // Check if the entry has a match field
                    if (entry['match ']) {
                        const { date, 'match ': match, ishan, diyan, kj2004, vedant, aryan, vishesh, shreyans, hitanshu } = entry;
                        // Create an array of players with their points
                        const playersData = [
                            { name: 'ishan', points: ishan },
                            { name: 'diyan', points: diyan },
                            { name: 'kj2004', points: kj2004 },
                            { name: 'vedant', points: vedant },
                            { name: 'aryan', points: aryan },
                            { name: 'vishesh', points: vishesh },
                            { name: 'shreyans', points: shreyans },
                            { name: 'hitanshu', points: hitanshu }
                        ];

                        // Check if the data already exists in the database
                        const existingMatch = await MatchData.findOne({ date: date, match: match });

                        if (existingMatch) {
                            // Update existing match data
                            existingMatch.players = playersData;
                            await existingMatch.save();
                            console.log('Match data updated successfully');
                        } else {
                            // Create a new MatchData object and save it to the database
                            const matchData = new MatchData({
                                date: date,
                                match: match,
                                players: playersData
                            });
                            await matchData.save();
                           // console.log('Match data inserted successfully');
                        }
                    } else {
                        console.log('Skipping entry without a match field');
                    }
                }
            }
        }

    } catch (error) {
        console.error('Error inserting/updating match data:', error);
    }
};




async function SortmatchesData() {

    const matchesData = await MatchData.find();
    try {
        // Create an object to store total points for each player
        const playersTotalPoints = {};

        // Iterate over matchesData array
        matchesData.forEach((match) => {
            // Iterate over players array in each match
            match.players.forEach((player) => {
                // Check if player.points exists and is not undefined
                if (player.points !== undefined) {
                    // Update total points for each player
                    if (playersTotalPoints[player.name]) {
                        playersTotalPoints[player.name] += player.points;
                    } else {
                        playersTotalPoints[player.name] = player.points;
                    }
                }
            });
        });

        // Update player total points in the database
        for (const playerName in playersTotalPoints) {
            if (Object.hasOwnProperty.call(playersTotalPoints, playerName)) {
                const totalPoints = playersTotalPoints[playerName];
                // Call the function to update player total points
                await updatePlayerTotal(playerName, totalPoints);
            }
        }
    } catch (error) {
        console.error('Error updating player total points:', error);
    }
}


async function updatePlayerTotal(playerName, totalPoints) {
    try {
        // Find the player's document in PlayerTotal collection
        let playerTotal = await PlayerTotal.findOne({ name: playerName });

        if (playerTotal) {
            // If the player exists, update the total points
            playerTotal.totalPoints = totalPoints;
        } else {
            // If the player doesn't exist, create a new document
            playerTotal = new PlayerTotal({
                name: playerName,
                totalPoints: totalPoints
            });
        }

        // Save the updated/created document
        await playerTotal.save();
    } catch (error) {
        console.error(`Error updating player total points for ${playerName}:`, error);
    }
}




exports.insertPlayerTotal =  async (req, res) => {
    const jsonData = req.body; // Assuming req.body contains the JSON data from frontend
    const sheetData = jsonData.Sheet1; // Assuming the data is in Sheet1
    try {
        // Create an array to hold all bulk write operations
        const bulkOperations = [];

        // Iterate over playersData array
        playersData.forEach(async (player) => {
            // Find the player's document in PlayerTotal collection
            const playerTotal = await PlayerTotal.findOne({ name: player.name });

            if (playerTotal) {
                // If the player exists, update the total points
                playerTotal.totalPoints += player.points;
                // Add update operation to the bulkOperations array
                bulkOperations.push({
                    updateOne: {
                        filter: { _id: playerTotal._id },
                        update: { $set: { totalPoints: playerTotal.totalPoints } }
                    }
                });
            } else {
                // If the player doesn't exist, create a new document
                // Add insert operation to the bulkOperations array
                bulkOperations.push({
                    insertOne: {
                        document: {
                            name: player.name,
                            totalPoints: player.points
                        }
                    }
                });
            }
        });

        // Execute bulk write operations
        await PlayerTotal.bulkWrite(bulkOperations);
    } catch (error) {
        console.error('Error updating player total points:', error);
    }
};



async function MatchDetails()  {
    try {
        // Retrieve the match name from the database field
        const matchData = await MatchData.findOne({}); // Assuming you want to get the first match data, you can adjust this query based on your requirements
        
        if (!matchData) {
            return res.status(404).send('Match data not found');
        }

        const matchName = matchData.match; // Assuming the match name is stored in the "match" field of the match data document

        // Extract player names and points from the match data
        const playerDetails = matchData.players.map(player => ({
            name: player.name,
            points: player.points
        }));

        // Respond with the player details for the specific match
        console.log(matchName ,playerDetails );
        // res.json({
        //     match: matchName,
        //     players: playerDetails
        // });
    } catch (error) {
        console.error('Error fetching match details:', error);
        res.status(500).send('Internal Server Error');
    }
};



async function MatchDetailsForAllMatches() {
    try {

        const Matdata = await MatchData.find(); 
        const formattedData = Matdata.map(match => {
            return {
                match: match.match,
                date: match.date,
                players: match.players.map(player => ({
                    name: player.name,
                    points: player.points
                }))
            };
        });

        //res.status(200).json(formattedData);

         //console.log(formattedData);
         return formattedData;
    } catch (error) {
        console.error('Error fetching match details for all matches:', error);
        throw error; // Throw the error to be caught by the caller
    }
};






