var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js','src/**/*.js']; //toate files .js sub src si radacina

gulp.task('verificare', function() {
    return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                            verbose: true
                        }));
});

/*
gulp.task('verificare', function() {
    return gulp.src(jsFiles)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                            verbose: true
                        }))
            .pipe(jscs())
            .pipe(jscs.reporter());
});
*/


//fisierele .js care le importam extern lorem ipsum lorem ipsum
gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;

    var options = {
        bowerJson : require('./bower.json'),
        directory : './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(gulp.dest('./src/views'));
});


/*
//fisierele .js si  .css create de noi 
gulp.task('custominject', function () {
  
var inject = require('gulp-inject');

    var injectOptions = {
        ingnorePath: 'public',
        addRootSlash: false
    };

  var target = gulp.src('./src/views/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./public/js/*.js', './public/css/*.css'], {read: false});

  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./src/views'));
});
*/


/*
gulp.task('serve', ['verificare','inject',], function(){
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {'PORT': 3000 },
        watch: ['jsFiles','index.html']
    };

    return nodemon(options)
        .on('restart', function(ev){
            console.log('Restart server ....');
        });
});*/



gulp.task('serve', function () {
  nodemon({ script: 'app.js',
          ext: 'html js',
          ignore: ['ignored.js'],
          tasks: ['verificare','inject'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});