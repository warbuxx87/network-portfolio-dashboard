var express = require('express');
var router = express.Router();
var fs = require('fs');
var ethusd = fs.readFileSync('./public/ethusd.html');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(ethusd);
});

module.exports = router;;
