'use strict';
var Base = require('../app/base')

module.exports = Base.extend({
  initializing: function () {
    this.context = this.options.context;
    this.structure = this.context.structure;
  },

  configuring: function () {
    var props = this.context.props;
    var has = this.context.has;
    var npm = [];
    var npmDev = [];
    var bower = [];

    this.structure.addFolder('gulp');
    this.structure.gulp.addFolder('utils');

    npmDev.push('require-dir');
    npmDev.push("del");
    npmDev.push("yargs");
    npmDev.push("through2");
    npmDev.push("lazypipe");
    npmDev.push("vinyl-source-stream");

    if (has.server) {
      npmDev.push('browser-sync');
      this.structure.gulp.add(this, 'serve.js');
    }

    npmDev.push('gulp');
    npmDev.push('gulp-load-plugins');
    npmDev.push("gulp-if");
    npmDev.push("gulp-ignore");
    npmDev.push("gulp-size");
    npmDev.push("gulp-notify");
    npmDev.push("gulp-filter");
    npmDev.push("gulp-rev");
    npmDev.push("gulp-watch");
    npmDev.push("gulp-plumber");

    this.structure.add(this, 'gulpfile.js');
    this.structure.gulp.utils.add(this, '$.js');
    this.structure.gulp.utils.add(this, 'onError.js');
    this.structure.gulp.utils.add(this, 'utils.js');
    this.structure.gulp.utils.add(this, '../../../../app/common/paths.js', 'paths.js');
    this.structure.gulp.utils.add(this, '../../../../app/common/options.js', 'options.js');
    this.structure.gulp.add(this, 'clean.js');

    switch (props.style) {
      case 'sass':
        this.structure.gulp.add(this, 'sass.js');
        npmDev.push('gulp-sass');
        break;
      case 'less':
        this.structure.gulp.add(this, 'less.js');
        npmDev.push('gulp-less');
        break;
      case 'stylus':
        this.structure.gulp.add(this, 'stylus.js');
        npmDev.push('gulp-stylus');
        break;
    }

    if (has.browserify) {
      this.structure.gulp.add(this, 'browserify.js');
      npmDev.push('browserify');
      npmDev.push('watchify');

      switch (props.script) {
        case 'babel':
          npmDev.push('babelify');
          break;
        case 'traceur':
          npmDev.push('es6ify');
          break;
        case 'coffeescript':
          npmDev.push('coffeeify');
          break;
        case 'typescript':
          npmDev.push('tsify');
          break;
      }
    } else {
      switch (props.script) {
        case 'babel':
          this.structure.gulp.add(this, 'babel.js');
          npmDev.push('gulp-babel');
          break;
          case 'traceur':
            this.structure.gulp.add(this, 'traceur.js');
            npmDev.push('gulp-traceur');
            break;
        case 'coffeescript':
          this.structure.gulp.add(this, 'coffee.js');
          npmDev.push('gulp-coffee');
          break;
        case 'typescript':
          this.structure.gulp.add(this, 'typescript.js');
          npmDev.push('gulp-typescript');
          break;
      }
    }

    if (has.autoprefixer) {
      npmDev.push('gulp-autoprefixer');
    }

    if (has.sourcemaps) {
      npmDev.push('gulp-sourcemaps');
    }

    if (has.csslint) {
      npmDev.push('gulp-csslint');
    }

    if (has.jslint) {
      if (has.coffeescript) {
        npmDev.push('gulp-coffeelint');
        npmDev.push('coffeelint-stylish');
      } else if (has.typescript) {
        npmDev.push('gulp-tslint');
      } else {
        npmDev.push('gulp-eslint');
      }
    }

    if (props.test === 'karma') {
      props.karmaLaunchers.forEach(function (l) {
        npmDev.push('karma-' + l + '-launcher');
      });

      props.karmaReporters.forEach(function (l) {
        npmDev.push('karma-' + l + '-reporter');
      });
    }

    this.context.add({
      versions: require('./versions'),
      npm: npm,
      npmDev: npmDev,
      bower: bower
    });
  }
});
