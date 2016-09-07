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
		
		//res.send('I am inside the autors detail route: '+ test);
		var receivedId = new ObjectId(req.params.id);
		var url = '';
		if(port === 3000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
		}	
		
		mongodb.connect(url, function(err, db)	{
			var collection = db.collection('authors');

			collection.findOne({_id: receivedId},
					function(err, results) {
						console.log(results);
						res.render('authorView', {
							title: 'Author details',
							nav: nav,
							author: results
						});
				 });
			});
	});


authorsRouter.route('/books/:name')
	 .get(function(req,res) {
	 	var authorName = req.params.name;

	 	var url = '';
		if(port === 3000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
		}	

		mongodb.connect(url, function(err, db)	{
			var collection = db.collection('authors');

			collection.find({author: authorName},
					function(err, results) {
						//console.log(results);
						res.send('Cartii care apartin unui autor');
						/*res.render('authorView', {
							title: 'vook belonging to ',
							nav: nav,
							author: results
						});*/
				 });
		 });
	});	 	

	return authorsRouter;

};

module.exports = router;