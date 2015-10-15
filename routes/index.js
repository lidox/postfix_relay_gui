var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	var Pars = require(__dirname+'\\..\\data\\parser.js');
    var test = new Pars();
	
	var logRecords = test.getLogRecordsByFilename('mail.log');
	res.render('root.jade', {logRecords:logRecords});
});

module.exports = router;