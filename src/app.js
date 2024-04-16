const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 5001;
const Stats = require('./controllers/stats.controller.js');
const Leadtable = require('./controllers/LeadTable.controller.js');
const DB_name= process.env.DB_name
//url encoding 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
//static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
// app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));

//targeting routes
// const AdminRoutes = require('./routes/admin.router.js');


//middleware
app.get('/leadtable',Leadtable.Leadtable);
app.get('/allData',Leadtable.AllData);
app.get('/stats',Leadtable.Stats);
app.get('/upload',Leadtable.fileupload);
app.post('/exceltojson',Leadtable.ExcelToJson);
app.post('/updatePoints',Leadtable.UpdatePoints);
app.post('/insertMatchData',Leadtable.insertMatchData);
app.post('/insertPlayerTotal',Leadtable.insertPlayerTotal);
app.get('/getdata',Leadtable.Getdata);

app.get('/' , (req,res) => {
    res.render('index')
})


// CORS
const cors = require('cors');
const { env } = require('process');
const connectDB = require('./config/db.js');
app.use(cors({optionsSuccessStatus: 200}))

app.get('/close-it',(req,res)=>{
    res.send('closing your server......')
    setTimeout(() => {
        process.exit(0)
    }, 30000);
})
app.listen(port,()=>{
    try {
        connectDB()
        console.log(`app runing on :- http://localhost:${port}/`);
    } catch (error) {
        console.log(error);
    }
})
//exporting app
module.exports = app;