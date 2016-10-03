var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;

var searchController = function(nav) {

	var searchBooks = function(req, res) {

		var url = '';
		if(port === 3000) {	
			url = 'mongodb://localhost/libraryApp';
		} else {
			url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
	    }	


	    mongodb.connect(url, function(err, db) {
	    	var collection = db.collection('books');

			var a = req.param('qs');
		
			collection.find({'title': a}).toArray(

				function(err, results) {
					 console.log(results);
					 res.render('search', {
					 title: 'Search',
					 nav: nav,
					 books: results	
					 });
				});
	   		});

		};

		return {
			searchBooks: searchBooks
		};

};

module.exports = searchController;