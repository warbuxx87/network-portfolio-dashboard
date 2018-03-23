var express = require('express');
var router = express.Router();
var fs = require('fs');
var btcusd = fs.readFileSync('./public/btcusd.html');
var btccad = fs.readFileSync('./public/btccad.html');
var btceur = fs.readFileSync('./public/btceur.html');
var ethusd = fs.readFileSync('./public/ethusd.html');

/* GET btc/usd page. */
router.get('/btc/usd', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btcusd);
});

/* GET btc/cad page. */
router.get('/btc/cad', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btccad);
});

/* GET btc/cad page. */
router.get('/btc/eur', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(btceur);
});

<<<<<<< HEAD
module.exports = router;
=======
/* GET eth/usd page. */
router.get('/eth/usd', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send(ethusd);
});

module.exports = router;;
>>>>>>> 40b54f905977ed16cb5078daa1918b89d588bebb
