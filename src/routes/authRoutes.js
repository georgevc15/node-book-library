var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT || 3000;

var router = function() {
	authRouter.route('/signUp')
		.post(function (req, res) {
			console.log(req.body);
			
			var url = '';
			if(port === 3000) {	
				url = 'mongodb://localhost/libraryApp';
			} else {
				url = 'mongodb://book_usr:book_pass@ds161475.mlab.com:61475/book-store';
			}	
			mongodb.connect(url, function(err, db) {
				var collection = db.collection('users');
				var user = {
					username: req.body.userName,
					password: req.body.password,
				};
				//aici verifici daca este user daca exista nu vei face insert
				collection.insert(user, 
					function(err, results) {
						req.login(results.ops[0], function() {
							res.redirect('/auth/profile');
						});
				});
			});


		});
	authRouter.route('/profile')
		.get(function(req, res) {
			res.json(req.user);
		});	
		return authRouter;
};

module.exports = router;
