function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/nuestilogat');
  };
}

module.exports = authenticationMiddleware;