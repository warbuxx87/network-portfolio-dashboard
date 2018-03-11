var express = require('express');
var router = express.Router();
var fs = require('fs');
var btcusd = fs.readFileSync('./public/btcusd.html');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btcusd);
});

module.exports = router;;
