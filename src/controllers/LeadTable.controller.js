const totalpointsModel = require('../models/leadboard');

exports.Leadtable = async (req, res, next) => {
    const data = await totalpointsModel.find(); 
    res.render("Leadtable",{ data: data })
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
         const data = await totalpointsModel.find(); 
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