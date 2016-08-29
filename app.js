var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //foloseste passport pentru parsarea cookeiurilor necesare pentru sesiune
var passport = require('passport');
var session = require('express-session'); //sesiunile ce tin ce frameworkul express care vor fi folosite de passport ca sa puna informatiile user, password etc


var LocalStrategy = require('passport-local').Strategy;



var app = express();

var port = process.env.PORT || 3000;

var nav = [{
    Link:'/Books', 
    Text: 'Books'
    }, {
    Link:'/Authors',
    Text: 'Authors'
    }];
    

var bookRouter = require('./src/routes/booksRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
var authorsRouter = require('./src/routes/authorsRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false })); // parse application/x-www-form-urlencoded 
app.use(bodyParser.json()); // parse application/json 
app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: false,
    cookie: {  }

}));
require('./src/config/passport')(app);

app.set('views','./src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.use('/Authors', authorsRouter);

app.get('/', function(req, res) {
    res.render('index', {
    	title: 'Helo from render', 
    	nav: nav
    	});
});

app.listen(port, function(err) {
    console.log('Server running on port ' + port);
});