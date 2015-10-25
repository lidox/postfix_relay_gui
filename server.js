var express = require('express');
var app = express();
//var parser = require('postfix-parser');
console.log('mail relay server started! ;)');
//var smtpdList = [];

// view engine
app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views');

// middleware
app.use(express.static(__dirname + '/public'));

// define routes
var index = require(__dirname + '/routes/index');
var errors = require(__dirname + '/routes/errors');
var test2 = require(__dirname + '/routes/test2');

// routen middleware
app.use('/', index);
app.use('/errors', errors);
app.use('/test2', test2);

//Tests
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.t === '1';
    next();
});

// NOTE: you cannot use routes and app.get() methods at the same time...
/*app.get('/', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.log');
	res.render('root.jade', {testScript:'tests/posts.js',logRecords:logRecords});
	smtpdList = [];
});

app.get('/fehler', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.log');
	res.render('fehler.jade', {smtpdList:smtpdList});
	smtpdList = [];
});

app.get('/test', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.log');
	res.render('test.jade', {smtpdList:smtpdList});
	smtpdList = [];
});*/



function getLogRecordsByFilename(fileName){
	console.log('getLogRecordsByFilename() started');
	var parser = require('postfix-parser');
	var fs = require('fs');
	var logRecords = [];
	var appRoot = process.cwd();
    /*var onlyPath = require('path').dirname('D:\projekte\mailrelay\code\logmail.log');*/
	/*var array = fs.readFileSync(appRoot+'/../../../var/log/'+fileName).toString().split("\n");*/
	var array = fs.readFileSync(appRoot+'/../log/'+fileName).toString().split("\n");
	for(i in array) {
		try {
			var parsedObject = parser.asObject(array[i]);
			if(parsedObject.prog!='postfix/smtpd'){
				logRecords.push(parsedObject);	
		    }
			else{
				smtpdList.push(array[i]);
			}
		}
		catch(err) {
			smtpdList.push(array[i]);
			//console.log('could not parse a line: '+array[i])
		}
	}
	console.log(logRecords.length +' records and '+smtpdList.length+' errors has been read!');
	console.log('getLogRecordsByFilename() finished');
	return logRecords;
}

function containsUselessWord(logLine){
	var uselessWords = [];
	uselessWords.push('disconnect from');
	uselessWords.push('connect from');
	uselessWords.push('client=unknown');
	
	for(i in array) {
		if (logLine.indexOf(uselessWords[i]) !=-1){
			return true;
		}
	}
	return false;
}


app.listen(1337);
