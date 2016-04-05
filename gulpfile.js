'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var debowerify = require('debowerify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
 
gulp.task('sass', function () {
  return gulp.src('./public/css/sass/**/*.scss')
  	.pipe(sass({includePaths: ['./bower_components']}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/css/sass/**/*.scss', ['sass']);
});

function buildScript(file, watch) {
  
  var props = {
    entries: ['./public/js/src/' + file],
    debug : false,
    transform:  [babelify, debowerify]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);
  function rebundle() {
    var stream = bundler.bundle();
    return stream
      //.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./public/js/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// run once
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

// run 'scripts' task first, then watch for future changes
gulp.task('scripts:watch', function() {
  return buildScript('main.js', true);
});

gulp.task('jsx', function() {
  return gulp.src('./public/js/src/jsx/*.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('jsx:watch', function () {
  gulp.watch('./public/js/src/jsx/*.js', ['jsx']);
});

gulp.task('default', ['scripts', 'sass', 'jsx']);
gulp.task('watch', ['scripts:watch', 'sass:watch', 'jsx:watch']);

gulp.task('watch:sync', ['scripts:watch', 'sass:watch', 'jsx:watch'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3030",
    files: ["public/**/*.*", "views/**/*.*"],
    port: 7000,
  });
});