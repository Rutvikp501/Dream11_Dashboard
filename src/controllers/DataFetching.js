const axios = require("axios");

exports.GetMatches = async (req, res, next) => {
    try {
        let MatchPlayerPoints ;
        let data = JSON.stringify({
            "isNonCashAppVersion": false,
            "sportsType": 1
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.my11circle.com/api/lobbyApi/v1/getMatches',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'SSID=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e; SSIDuser=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e%3A64474708; device.info.cookie={"bv":"123.0.0.0","bn":"Chrome","osv":"10","osn":"Windows","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
            // you have chage cokkies that u will get after login so you have to login first
        };
        let response = await axios.request(config);
        //console.dir(response.data);
        let keys = Object.keys(response.data.matches);
        for (const key in response.data.matches) {
            if (Object.hasOwnProperty.call(response.data.matches, key)) {
                const matchesArray = response.data.matches[key];
                // Iterate over each array of objects
                matchesArray.forEach(async (matchObject, index) => {
                    // Access each object's data here
                    if (matchObject.seriesName === 'TATA IPL 2024') {
                        // Access or process the desired data from the object here
                        const matchIds = matchObject.matchId;

                        console.log("Match IDs:", matchIds);
                        // Call GetMatchPlayerPoints and await its result
                        let MatchPlayerPoints = await exports.GetMatchPlayerPoints({ query: { matchid: matchIds } });
                      //  console.log("Match Player Points:", MatchPlayerPoints);
                    }
                });
            }
        }

        res.render("my11", { keys, data: response.data.matches, MatchPlayerPoints});
    } catch (error) {
        console.log(error);
        next(error.message);
    }
};

exports.GetMatchPlayerPoints = async (req, res, next) => {
    try {
        let data = JSON.stringify({
            "matchId": req.query.matchid
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.my11circle.com/api/lobbyApi/matches/v1/getMatchPlayerPoints',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'SSID=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e; SSIDuser=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e%3A64474708; device.info.cookie={"bv":"123.0.0.0","bn":"Chrome","osv":"10","osn":"Windows","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
        };
        let response = await axios.request(config);
        // Return the response data
        return response.data;
    } catch (error) {
        next(error.message);
    }
};

exports.GetTeamDetails = async (req, res, next) => {
    try {
        let data = JSON.stringify({
            "matchId": 78439,
            "teamId": 2508,
            "contestId": 197054030,
            "nonCashAppVersion": true
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.my11circle.com/api/lobbyApi/userteams/v1/getTeamDetails',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'SSID=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e; SSIDuser=SSID4d45e371-07c4-4aa4-b7ca-809cc640114e%3A64474708; device.info.cookie={"bv":"123.0.0.0","bn":"Chrome","osv":"10","osn":"Windows","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
        };
        let response = await axios.request(config);
        console.log(response.data);
    } catch (error) {
        next(error);
    }
};

exports.Getdata = async (req, res, next) => {
    // Your code here
};
