var express = require('express');
var authorsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;


var router = function(nav) {
	
authorsRouter.route('/')
	.get(function(req, res) {
		
	var url = '';
	if(port === 3000) {	
		url = 'mongodb://localhost/libraryApp';
	} else {
		url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	}	

	mongodb.connect(url, function(err, db){
		var collection = db.collection('authors');

		collection.find({}).toArray(
			
			function(err, results) {
				res.render('authorsListView', {
						title: 'Authors',
						nav: nav,
						authors: results
				});
			});	
		});
	});


authorsRouter.route('/:id')
	.get(function(req, res) {
		res.send('I am inside the autors detail route');
	});


	return authorsRouter;

};

module.exports = router;