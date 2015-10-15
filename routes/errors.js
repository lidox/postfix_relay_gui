var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('errors.jade');
});

module.exports = router;