var Parser = {
    /*greet: function (person){
        return 'Hello '+person;
    }
    */
    getLogRecordsByFilename: function(fileName) {
        smtpdList = [];
        console.log('getLogRecordsByFilename() started');
        var parser = require('postfix-parser');
        var fs = require('fs');
        var logRecords = [];
        var appRoot = process.cwd();
        /*var onlyPath = require('path').dirname('D:\projekte\mailrelay\code\logmail.log');*/
        /*var array = fs.readFileSync(appRoot+'/../../../var/log/'+fileName).toString().split("\n");*/
        var array = fs.readFileSync(appRoot+'/../log/' + fileName).toString().split("\n");
        for (i in array) {
            try {
                var parsedObject = parser.asObject(array[i]);
                if (parsedObject.prog !== 'postfix/smtpd') {
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
        console.log(logRecords.length +' records and '+smtpdList.length + ' errors has been read!');
        console.log('getLogRecordsByFilename() finished');
        return logRecords;
    }
};

module.exports = Parser;
