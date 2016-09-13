var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var port = process.env.PORT || 3000;

var bookController = function(bookService, nav) {
	
	var middlewareSecureRoute = function(req, res, next) {
		//if(!req.user){
			//res.redirect('/');
		//}
		next();
	};

	var getIndex = function(req, res) {

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
    					title: 'Available books', 
    					nav: nav,
	  					books: results
    			});

			});
		});
	};

	var getById = function(req, res) {
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
					//console.log(results);
					res.render('bookView', {
    					title: 'Book details', 
    					nav: nav,
	  					book: results
    			});
			});
		});
	};

	return {
		getIndex: getIndex,
		getById: getById,
		middlewareSecureRoute: middlewareSecureRoute
	};
};


module.exports = bookController;