var express = require('express');
var router = express.Router();
var logRecords = require('../lib/parser').getLogRecordsByFilename('mail.log');
var cars = ["Saab", "Volvo", "BMW"];
var portsToDisplay = [
	{
		id : "1",
		port : "443"
	},
	{
		id : "2",
		port : "993"
	}
];

router.get('/', function (req, res) {
	res.render('errors', {
		logRecords : logRecords,
		portsToDisplay : portsToDisplay
	});
});

router.post('/addport', function (req, res) {
	// npm install body-parser --save
	var port = 
	{
		id : "2",
		port : req.body.port
	};
	
	portsToDisplay.push(port);
	res.redirect('/errors');
});

module.exports = router;