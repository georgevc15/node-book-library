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
        
			var qsSearchedBook = req.query.qs;
			 //console.log(qsSearchedBook);
			//collection.find({'title': qsSearchedBook}).toArray(
			 collection.find({  '$text': {
      						'$search': qsSearchedBook
  			  }}).toArray(

				function(err, results) {
					 res.render('bookListView', {
					 title: 'Search',
					 nav: nav,
					 books: results,
					 message: ''	
					 });
				});
	   		});

		};

		return {
			searchBooks: searchBooks
		};

};

module.exports = searchController;