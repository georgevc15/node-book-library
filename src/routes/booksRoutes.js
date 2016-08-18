var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;

var router = function(nav) {

bookRouter.route('/')
	.get(function(req, res) {

	var url = '';
	if(port === 3000) {	
		url = 'mongodb://localhost/libraryApp';
	} else {
		url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	}	
		mongodb.connect(url, function(err, db) {
			var collection = db.collection('books');
			
			collection.find({}).toArray(
				function(err, results) {

					res.render('bookListView', {
    					title: 'Books', 
    					nav: nav,
	  					books: results
    			});

			});
		});
	});

bookRouter.route('/:id')
	.get(function(req, res){
		var receivedId = new ObjectId(req.params.id);
		
	var url = '';
	if(port === 3000) {	
		url = 'mongodb://localhost/libraryApp';
	} else {
		url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	}	
		

		mongodb.connect(url, function(err, db) {
			var collection = db.collection('books');
			
			collection.findOne({_id: receivedId},
				function(err, results) {

					console.log(results);

					res.render('bookView', {
    					title: 'Books', 
    					nav: nav,
	  					book: results
    			});

			});
		});
	});

	return bookRouter;

};


module.exports = router;