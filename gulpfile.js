var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ pattern: ['gulp-*'] });
var merge = require('merge2');
var del = require('del');

/**
 * A simple task to clean any build products
 */
gulp.task('clean', function(cb) {
  del(['release'], cb);
});

/**
 * A simple task to copy the main app.js file to the root directory
 */
gulp.task('copy', function() {
    return gulp.src(["./src/index.html","./release/js/**/*.js"])
                .pipe(gulp.dest("./dist"));
});

gulp.task('build', function() {
    var tsResult = gulp.src('src/*.ts')
                       .pipe($.typescript({
                           declarationFiles: true,
                           noExternalResolve: true
                       }));
    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});