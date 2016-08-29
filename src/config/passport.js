var passport = require('passport');

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	//var user = 'Geo';

	/*passport.serializeUser(function(user, done){
		done(null, user); //user.id
	});
	
	passport.deserializeUser(function(userId, done){
		done(null, user);
	});*/

	require('./strategies/local.strategy')();

};