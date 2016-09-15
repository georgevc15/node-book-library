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
						    		title: 'Available books',
						    		adminNav: adminNav,
						    		books: results	
						    		});
								});
						    });
			    });



	adminRouter.route('/addBooks')

				.get(function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
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

	adminRouter.route('/addAuthors')

				.get(function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
					}	

					mongodb.connect(url, function(err, db) {
						var collection = db.collection('authors');
						collection.insertMany(authors,
							function(err, results) {
								res.send(results);
								db.close();
							});
						});
				});

	return adminRouter;
};

module.exports = router;