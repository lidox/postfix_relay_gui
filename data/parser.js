
module.exports = function Pars()
{
	var parser = require('postfix-parser');

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
				if(parsedObject.prog!='postfix/smtpd'){/**/
					logRecords.push(parsedObject);
				}/**/
			}
			catch(err) {
				console.log('could not parse a line')
			}
		}
		console.log(logRecords.length +' records has been read! :)');
		console.log('getLogRecordsByFilename() finished');
		return logRecords;
	}
}