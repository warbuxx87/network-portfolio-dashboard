var express = require('express');
var router = express.Router();
var fs = require('fs');

var exchange_page = fs.readFileSync('./public/bitstamp.html');

/* GET exchange page. */
router.get('/bitstamp', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(exchange_page);
});

module.exports = router;
