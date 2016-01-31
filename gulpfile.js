var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

//environment variables. dev, stage, prod
var env = process.env.NODE_ENV;

//converts the less files to css and puts them in the css folder
gulp.task('compile-less', function(){
	return gulp.src('./less/styles.less')
      .pipe(plumber())
	    .pipe(less({
	      paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
       .on('error', handleError)
      .pipe(autoprefixer())
      .pipe(rename('styles.css'))
      .on('error', handleError)
    	.pipe(gulp.dest('./css/'))
});

gulp.task('watch', function() {
 
  // Watch .less files
  gulp.watch('./less/**/*.*', ['compile-less']);

});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('default', ['compile-less', 'watch']);