var gulp = require('gulp');
var $    = require('./utils/$');

gulp.task('images', ['deploy:clean', 'icons'], function () {
  return gulp.src($.paths.images.srcFiles, {base: '.'})
    .pipe($.size({title: 'Images before optimizations'}))
    .pipe($.imagemin())
    .pipe($.size({title: 'Images after optimizations'}))
    .pipe(gulp.dest($.paths.dist.dest));
});
