var express = require('express');
var router = express.Router();
var logRecords = require('../lib/parser').getLogRecordsByFilename('mail.log');



router.get('/', function(req, res) {
	res.render('errors', {logRecords:logRecords});
});

module.exports = router;