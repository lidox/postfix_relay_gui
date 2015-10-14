var express = require('express');
var data =  require('./data');
var app = express();
var parser = require('postfix-parser');
console.log('mail relay server started');
app.get('/', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.log');
	renderPageByData(logRecords,'root.jade', res);
});

app.get('/errors', function(req, res){
	var logRecords = getLogRecordsByFilename('mail.err.1');
	renderPageByData(logRecords,'errors.jade', res);
});

app.get('/howto', function(req, res){
	
	console.log('how gestartet');
	res.writeHead(200, {'Content-Tye' : 'text/html; charset=utf-8'});
	var body = data.teams[0].name;
	res.end(body);
});

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
		var parsedObject = parser.asObject(array[i]);
		try {
			/*if(parsedObject.prog!='postfix/smtpd'){*/
				logRecords.push(parsedObject);
		    /*}*/
		}
		catch(err) {
			console.log('could not parse a line')
		}
	}
	console.log(logRecords.length +' records has been read! :)');
	console.log('getLogRecordsByFilename() finished');
	return logRecords;
}

function renderPageByData(logRecords, pageName, res){
	app.set('view engine', 'jade');
	app.set('views', __dirname + '/views');
    app.use(express.static(__dirname + '/public'));
	res.render(pageName, {logRecords:logRecords});
}

app.listen(1337);
