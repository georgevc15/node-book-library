var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var async = require('async');

var port = process.env.PORT || 3000;


var books = [
		{
				title: 'War and Peace',
				genre: 'Historical Fiction',
				author: 'ALev Nikolayevich Tolstoy',
				bookId: 656,
				read: false
		},
		{
				title: 'Les Misérables',
				genre: 'Historical Fiction',
				author: 'Victor Hugo',
				bookId: 24280,
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
		},
		{
				title: 'The adventures of Peter Pan',
				genre: 'Genre 1',
				author: 'Author 1',
				read: false
		}
			];

var authors = [
		{
				name: 'Author 1',
				genre: 'Genre 1',
				read: false
		},
		{
				name: 'Author 2',
				genre: 'Genre 2',
				read: false
		},
		{
				name: 'Author 3',
				genre: 'Genre 1',
				read: false
		},
		{
				name: 'Author 4',
				genre: 'Genre 5',
				read: false
		}
			];


var genres = [
		{
					type: 'History'
		},
		{
					type: 'Science'
		},
		{
					type: 'Fiction'
		}
			];




var router = function (adminNav) {

	/*//toata ruta admin se securizeaza
	adminRouter.use(function (req, res, next) {
	  if(req.user) {	
		var adminUser = req.user.username;
				 if(adminUser !== 'admin') {
				 	res.redirect('/');
				 }
			  } else {
				res.redirect('/');
			}
		  next();		
		});*/


	adminRouter.route('/')
				/*
				//only routes for '/' will be secured
				.all(function(req, res, next){
					if(!req.user) {
						res.redirect('/');	
					}
					next();
				})*/

				.get(function(req, res) {
					res.render('adminView', {
						title: 'Admin page',
						adminNav: adminNav
					});
				});

	
	adminRouter.route('/manage-books')

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
									res.render('manageBooks', {
						    		title: 'Manage books',
						    		adminNav: adminNav,
						    		books: results	
						    		});
								});
						    });
			    });


	adminRouter.route('/manage-authors')
	
				.get(function(req, res) {
					
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
				});			    


	adminRouter.route('/add-books') 
			   
			   .get(function(req, res) {

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

				});
	


	adminRouter.route('/add-authors') 
			   .get(function(req, res) {
			   		
			   		res.render('adminAddAuthors', {
			   			title: 'Add authors',
			   			adminNav: adminNav,
			   			genres: genres
			   			});
			   	});



	adminRouter.route('/addBooksSubmit')

				.post(function(req, res) {
					
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
				});


	adminRouter.route('/addAuthorsSubmit')

				.post(function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
					}	

					var newAuthor = req.body;
					//console.log(newAuthor);
					//console.log(newAuthor.name +'---'+newAuthor.genre);
                     if(newAuthor.name && newAuthor.genre) {
						mongodb.connect(url, function(err, db) {
							var collection = db.collection('authors');
							collection.insert(newAuthor,
								function(err, results) {
									res.send({'message': 'Author added'});
									db.close();
								});
						 });
								} else {
								res.send({'message': 'Please fill in all required fields'});
							} 
				});


	return adminRouter;
};

module.exports = router;