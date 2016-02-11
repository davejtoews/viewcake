'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
 
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
  	.pipe(sass({includePaths: ['./bower_components']}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('scripts', function() {
	gulp.src('public/js/main.js')
		.pipe(browserify({
			transform: [debowerify, babelify({'presets': ['react']})]
		}))
		.pipe(gulp.dest('./public/js'))
});

gulp.task('buildjs', function () {
    return browserify({basedir: './public/js/', compact: false})
        .add("main.js")
        .transform(babelify, {presets: ['react']})
        .transform(debowerify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js/'));
});