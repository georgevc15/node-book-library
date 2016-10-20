var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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

var adminController = require('../controllers/adminController')(adminNav, genres);

	adminRouter.route('/')
		.get(adminController.getIndex);
				

				/*
				//only routes for '/' will be secured
				.all(function(req, res, next){
					if(!req.user) {
						res.redirect('/');	
					}
					next();
				})

				.get(function(req, res) {
					res.render('adminView', {
						title: 'Admin page',
						adminNav: adminNav
					});
				});*/

	
	adminRouter.route('/manage-books')
			    .get(adminController.manageBooks);


	adminRouter.route('/manage-authors')
				.get(adminController.manageAuthors);			    


	adminRouter.route('/add-books') 
			   .get(adminController.addBooks);
	

	adminRouter.route('/add-authors') 
			   .get(adminController.addAuthor);


	adminRouter.route('/addBooksSubmit')
				.post(adminController.addBookSubmit);

	adminRouter.route('/addAuthorsSubmit')

				.post(function(req, res) {
					
					var url = '';
					if(port === 3000) {	
						url = 'mongodb://localhost/libraryApp';
					} else {
						url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
					}	

					var newAuthor = req.body;
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

	adminRouter.route('/delete-book/:id')

			.delete(function(req, res) {
					
				var receivedId = new ObjectId(req.params.id);

					var url = '';
						if(port === 3000) {	
							url = 'mongodb://localhost/libraryApp';
						} else {
							url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
						}	

						if(receivedId) 	{
							mongodb.connect(url, function(err, db)	{
								var collection = db.collection('books');
								collection.remove( {'_id': receivedId});
								res.sendStatus(200);
						});
								} else {
									res.sendStatus(404);
						}
				});


			adminRouter.route('/delete-author/:id')

			.delete(function(req, res) {
					
				var receivedId = new ObjectId(req.params.id);

					var url = '';
						if(port === 3000) {	
							url = 'mongodb://localhost/libraryApp';
						} else {
							url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
						}	

						if(receivedId) 	{
							mongodb.connect(url, function(err, db)	{
								var collection = db.collection('authors');
								collection.remove( {'_id': receivedId});
								res.sendStatus(200);
						});
								} else {
									res.sendStatus(404);
						}
				});


	return adminRouter;
};

module.exports = router;