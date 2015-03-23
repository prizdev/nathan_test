// /routes/partials/input.js

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('input', { title: 'MappyBird!' });  // renders /views/input.jade
});

module.exports = router;