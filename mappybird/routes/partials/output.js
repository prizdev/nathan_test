// /routes/partials/output.js
// 


var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	console.log('test: ' + req.session.testing);

	res.render('output', {session:req.session});  // renders /views/output.jade
});

module.exports = router;