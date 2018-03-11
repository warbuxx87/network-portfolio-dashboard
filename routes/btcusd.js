var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/btcusd.html', function(req, res, next) {
	res.send('btcusd.html');
});

module.exports = router;;
