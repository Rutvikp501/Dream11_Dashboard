const express = require('express');
const router = express.Router();
const path = require('path');
const Leadtable  = require('../controllers/LeadTable.controller');

router.use(express.static(path.join(__dirname, 'public')));

router.get('/',Leadtable.Leadtable() );

router.get('/chat',Leadtable.fileupload() );
router.post('/',Leadtable.ExcelToJson() );



module.exports = router;