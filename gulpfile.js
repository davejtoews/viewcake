'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
 
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
  	.pipe(sass({includePaths: ['./bower_components']}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
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

gulp.task('watch', function() {
  browserSync.init(null, {
    proxy: "http://localhost:3030",
    files: ["public/**/*.*", "views/**/*.*"],
    port: 7000,
  });
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});