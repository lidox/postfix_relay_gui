var express = require('express');
var router = express.Router();
var getLogRecordsByFilename = require('../lib/parser').getLogRecordsByFilename;
//var smtpdList = [];

router.get('/', function(req, res) {
	/*
    var Pars = require(__dirname+'\\..\\data\\parser.js');
    var test = new Pars();
	
	var logRecords = test.getLogRecordsByFilename('mail.log');
	res.render('root.jade', {logRecords:logRecords});
    */

    
    var logRecords = getLogRecordsByFilename('mail.log');
	res.render('root', {testScript:'tests/posts.js',logRecords:logRecords});
	//smtpdList = [];
});

module.exports = router;

/*app.get('/', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.log');
	res.render('root.jade', {testScript:'tests/posts.js',logRecords:logRecords});
	smtpdList = [];
});*/