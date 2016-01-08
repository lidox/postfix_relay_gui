var express = require('express');
var mongo_express = require('mongo-express/middleware');
var mongo_express_config = require('./mongo_express_config');
var app = express();
var serverport = 1337;
var bodyParser = require('body-parser');
//var parser = require('postfix-parser');
app.locals.pretty = true;
console.log('mail relay server started! ;) listen on port '+serverport);

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// view engine
app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views');

// middleware
app.use(express.static(__dirname + '/public'));
app.use('/mongo', mongo_express(mongo_express_config));

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


app.listen(serverport);

// start db from: https://www.mongodb.org/downloads#production
// mongod.exe --dbpath="D:\projekte\mailrelay\mongodb-win32-x86_64-3.2.0\db"

// npm install mongoose --save
