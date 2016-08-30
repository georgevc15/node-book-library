var express = require('express');
var authorsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;


var router = function(nav) {
	
authorsRouter.route('/')
	.get(function(req, res) {
		res.render('authorsListView', {
			title: 'Authors',
			nav: nav
		});
	});


authorsRouter.route('/:id')
	.get(function(req, res) {
		res.send('I am inside the autors detail route');
	});


	return authorsRouter;

};

module.exports = router;