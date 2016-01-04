var express = require('express');
var router = express.Router();
var logRecords = require('../lib/parser').getLogRecordsByFilename('mail.log');
var controller = require('../controllers/errorsController.js');


router.get('/', function (req, res) {
	res.render('errors', {
		logRecords : logRecords,
		portsToDisplay : controller.getPorts()
	});
});

router.post('/addport', function (req, res) {
	controller.addPort("3", req.body.port);
	res.redirect('/errors');
});

module.exports = router;