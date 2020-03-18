var gulp = require('gulp');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');

function js() {
    return rollup({
            // any option supported by Rollup can be set here.
            input: './app/js/index.js',
            format: 'iife'
            
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('./dist/js'));
}

function html() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
}

function images() {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}


exports.default = gulp.series(html, js, images)