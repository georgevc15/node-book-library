var express = require('express');
var authorsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;


var router = function(nav) {

var authorsController = require('../controllers/authorsController')(nav);

authorsRouter.route('/')
	.get(authorsController.getIndex);


authorsRouter.route('/:id')
	.get(authorsController.getAuthor);


authorsRouter.route('/books/:id')
	 .get(authorsController.booksBelongingToAnAuthor);	 	



	return authorsRouter;

};

module.exports = router;