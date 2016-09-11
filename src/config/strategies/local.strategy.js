var passport = require('passport');
var	LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
	/*passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done) {

	
	console.log('local strategy called with: '+ username + 'and password: ' + password);

	var url = 'mongodb://localhost/libraryApp';

		mongodb.connect(url, function(err, db) {
			var collection = db.collection('users');
			collection.findOne({
				username: username
			},
				function(err, results) {
					if(results.password === password) {	
						var user = results;
						done(null, user);
					 } else {
					 	done('Bad password', null);
					 }	
				}
			);
		 });

	
	}));*/
};