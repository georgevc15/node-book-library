var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var async = require('async');

var port = process.env.PORT || 3000;


var adminController = function(adminNav, genres) {


	var getIndex = function(req, res) {
			
			res.render('adminView', {
						title: 'Admin page',
						adminNav: adminNav
				});

	};


	var manageBooks = function(req, res) {
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
									res.render('manageBooks', {
						    		title: 'Manage books',
						    		adminNav: adminNav,
						    		books: results	
						    		});
								});
						   });
			    };



	var manageAuthors = function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
					}	

					mongodb.connect(url, function(err, db) {
						var collection = db.collection('authors');

						collection.find({}).toArray(
								function(err, results) {
									res.render('adminManageAuthors', {
									title: 'Manage authors',
									adminNav: adminNav,
									authors: results
							});		
						});	
					});
				};	


	var addBooks = function(req, res) {

					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
						
					}

					async.parallel([

						function(callback) {
								mongodb.connect(url, function(err, db) {
									var collection = db.collection('authors');
								    collection.find({}).toArray(function(err,items) {
         							  if(err) {
         							  	callback(err);
         							  } else {
         							  	callback(null, items);
         							 	 }
       								 });
								});
							 },

						function(callback) {
							callback(null, genres);
						} 

							], function(err, results) {
							   
							    //res.send('lorem');
							    res.render('adminAddBooks', { 
							    	title: 'Add books',
							   		adminNav: adminNav,
							   		authors: results[0],
							    	genres : results[1]
							    });
							});

				};

	var addAuthor = function(req, res) {
			   		
			   		res.render('adminAddAuthors', {
			   			title: 'Add authors',
			   			adminNav: adminNav,
			   			genres: genres
			   			});
			   	};			
	


	var addBookSubmit = function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
					}	
					var newBook = req.body;

					/*mongodb.connect(url, function(err, db) {
						var collection = db.collection('books');
						collection.insertMany(books, 
							function(err, results){
								res.send(results);
								db.close();
							});
					});*/

					mongodb.connect(url, function(err, db) {
						var collection = db.collection('books');
						collection.insert(newBook,
							function(err, results) {
								res.send({'message': 'Book added'});
								db.close();
							});
					});	

					//console.log(newBook);
					//res.sendStatus(200);
				};		   	


	return {
		getIndex: getIndex,
		manageBooks: manageBooks,
		manageAuthors: manageAuthors,
		addBooks: addBooks,
		addAuthor: addAuthor,
		addBookSubmit: addBookSubmit
	};
};


module.exports =  adminController;
