var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var bookRouter = express.Router();

app.use(express.static('public'));

app.set('views','./src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
	.get(function(req, res){
		res.send('Hello Books');
	});

bookRouter.route('/single')
	.get(function(req, res){
		res.send('Hello from Single Book');
	});

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
    	title: 'Helo from render', 
    	nav: [{
	    		Link:'/Books', 
	    		Text: 'Books'
    	}, {
	    		Link:'/Authors',
	    		Text: 'Authors'
	    	}]
    	});
});

app.get('/books', function(req, res) {
    res.send('Books');
});

app.listen(port, function(err) {
    console.log('Server running on port ' + port);
});