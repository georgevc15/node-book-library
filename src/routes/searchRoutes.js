var express = require('express');
var searchRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;

var router = function(nav) {

	var searchController = require('../controllers/searchController')(nav);
	

	searchRouter.route('/')
				.get(searchController.searchBooks);

		return searchRouter;		

};

module.exports = router;