var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;

var books = [
		{
				title: 'Books 1',
				genre: 'Genre 1',
				author: 'Author 1',
				read: false
		},
		{
				title: 'Books 2',
				genre: 'Genre 2',
				author: 'Author 2',
				read: false
		},
		{
				title: 'Books 3',
				genre: 'Genre 3',
				author: 'Author 3',
				read: false
		},
		{
				title: 'Books 4',
				genre: 'Genre 4',
				author: 'Author 4',
				read: false
		}
			];

var router = function (nav) {

	adminRouter.route('/addBooks')

				.get(function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://mongo_usr:mongo_pass@ds161475.mlab.com:61475/book-store';
					}	
					
					mongodb.connect(url, function(err, db) {
						var collection = db.collection('books');
						collection.insertMany(books, 
							function(err, results){
								res.send(results);
								db.close();
							});
					});
					//res.send('inserting books');
				});

	return adminRouter;
};

module.exports = router;