
const axios = require("axios")
exports.GetMatches =  async (req, res,next) => {
    try {
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
                'Cookie': 'SSID=SSID1edc5de7-462d-4255-962d-95c4d72f0295; SSIDuser=SSID1edc5de7-462d-4255-962d-95c4d72f0295%3A179277280; device.info.cookie={"bv":"false","bn":"false","osv":"false","osn":"false","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
        };
        let response = await axios.request(config);
        // res.send(response.data)
         console.dir(response.data)
        let keys = Object.keys(response.data.matches)
        res.render("my11", { keys, data: response.data.matches });
    } catch (error) {
        next(error.message);
    }
};

exports.GetMatchPlayerPoints =  async (req, res,next) => {
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
                'Cookie': 'SSID=SSID1edc5de7-462d-4255-962d-95c4d72f0295; SSIDuser=SSID1edc5de7-462d-4255-962d-95c4d72f0295%3A179277280; device.info.cookie={"bv":"false","bn":"false","osv":"false","osn":"false","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
        };
        let response = await axios.request(config);
        res.status(200).send(response.data);
    } catch (error) {
        next(error.message);
    }
};

exports.GetTeamDetails =  async (req, res,next) => {
    try {
        let data = JSON.stringify({
            "matchId": 78488,
            "teamId": 2142961218,
            "contestId": 197054030,
            "nonCashAppVersion": true
        }
        );
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.my11circle.com/api/lobbyApi/userteams/v1/getTeamDetails',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'SSID=SSID1edc5de7-462d-4255-962d-95c4d72f0295; SSIDuser=SSID1edc5de7-462d-4255-962d-95c4d72f0295%3A179277280; device.info.cookie={"bv":"false","bn":"false","osv":"false","osn":"false","tbl":"false","vnd":"false","mdl":"false"}; '
            },
            data: data
        };
        let response = await axios.request(config);
        console.log(response.data)
    }
    catch (error) {
        next(error)
    }
};

exports.Getdata =  async (req, res,next) => {

};
