var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var authenticationMiddleware = require('./middleware');

var user = {
  username: 'test',
  password: '123456',
  id: 1
};

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
  findUser(username, cb);
});

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (password !== user.password  ) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;