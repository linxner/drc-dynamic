"use strict";
//载入gulp模块
var gulp = require("gulp");
var browserSync = require("browser-sync");
var less = require("gulp-less");
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var imagemin = require("gulp-imagemin");
var minifycss=require('gulp-minify-css');
var htmlmin=require('gulp-htmlmin');

//转存html
gulp.task("html", function() {
  gulp
    .src("./src/index.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("./dist"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//转存js
gulp.task("minifyjs", function() {
  gulp
    .src("./src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//less编译
gulp.task("style", function() {
  gulp
    .src("src/styles/*.less")
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//css转存
gulp.task("css", function() {
  gulp
    .src("./src/css/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest("./dist/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//转存images
gulp.task("img", function() {
  gulp
    .src("./src/images/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//网页同步操作
gulp.task("serve", function() {
  browserSync({
    server: {
      baseDir: ["dist"]
    },
    function(err, bs) {
      console.log(bs.options.getIn(["urls", "local"]));
    }
  });
  gulp.watch("src/styles/*.less", ["style"]);
  gulp.watch("src/index.html", ["html"]);
  gulp.watch("src/js/*.js", ["minifyjs"]);
  gulp.watch("src/images/**/*", ["img"]);
  gulp.watch("src/css/*.css", ["css"]);
});
//监视
