var express = require('express');
var router = express.Router();
var fs = require('fs');
var btcusd = fs.readFileSync('./public/btcusd.html');
var btccad = fs.readFileSync('./public/btccad.html');
var btceur = fs.readFileSync('./public/btceur.html');

/* GET usd page. */
router.get('/btc/usd', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btcusd);
});

/* GET cad page. */
router.get('/btc/cad', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btccad);
});

/* GET cad page. */
router.get('/btc/eur', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btceur);
});

module.exports = router;
