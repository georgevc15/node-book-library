var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;


var router = function(nav) {

var bookController = require('../controllers/bookController')(null, nav);

//securizeaza toata ruta
bookRouter.use(bookController.middlewareSecureRoute);
//end securizare


bookRouter.route('/')
	.get(bookController.getIndex);

bookRouter.route('/:id')
	.get(bookController.getById);

	return bookRouter;

};


module.exports = router;