var express = require('express');
var router = express.Router();
var getLogRecordsByFilename = require('../lib/parser').getLogRecordsByFilename;

router.get('/', function(req, res) {
	var logRecords = getLogRecordsByFilename('mail.log');
	res.render('errors', {logRecords:logRecords});
});

module.exports = router;