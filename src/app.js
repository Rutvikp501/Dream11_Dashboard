const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
// CORS
const cors = require('cors');
const { env } = require('process');
const connectDB = require('./config/db.js');
const DataFetching = require('./controllers/DataFetching.js');
app.use(cors({ optionsSuccessStatus: 200 }))
const port = 5001;
const Leadtable = require('./controllers/LeadTable.controller.js');
//url encoding 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
//static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
// app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));

//targeting routes
// const AdminRoutes = require('./routes/admin.router.js');


//middleware
app.get('/leadtable', Leadtable.Leadtable);
app.get('/allData', Leadtable.AllData);
app.get('/stats', Leadtable.Stats);
app.get('/upload', Leadtable.fileupload);

app.post('/updatePoints', Leadtable.UpdatePoints);
app.post('/insertMatchData', Leadtable.insertMatchData);

//Data Fetching
app.get("/getMatches", DataFetching.GetMatchPlayerPoints);

app.get("/getMatchPlayerPoints", DataFetching.GetMatchPlayerPoints)

app.get("/getTeamDetails", DataFetching.GetTeamDetails)

// Not in use
app.get('/getdata', Leadtable.Getdata);
app.post('/exceltojson', Leadtable.ExcelToJson);
app.post('/insertPlayerTotal', Leadtable.insertPlayerTotal);




app.get('/', (req, res) => {
    res.render('index')
})




app.get('/close-it', (req, res) => {
    res.send('closing your server......')
    setTimeout(() => {
        process.exit(0)
    }, 30000);
})
app.listen(port, () => {
    try {
        connectDB()
        console.log(`app runing on :- http://localhost:${port}/`);
    } catch (error) {
        console.log(error);
    }
})
//exporting app
module.exports = app;