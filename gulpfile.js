var gulp = require('gulp');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');


//function bundleJs() {
//    gulp.src('./app/**/*.js')
/*
        // transform the files here.
        .pipe(rollup({
            // any option supported by Rollup can be set here.
            input: './app/js/index.js'
        }))
        .pipe(gulp.dest('./dist'));
}
*/

function bundleJs() {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        //.pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
}

function images() {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}


exports.default = gulp.series(bundleJs, images)