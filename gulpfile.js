const { src, dest, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const browsersync = require("browser-sync").create();
const clean = require("gulp-clean");
const watch = require("gulp-watch");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;

const path = {
  src: {
    html: "./src/index.html",
    css: "./src/*.css",
    js: [
      "./src/script/const.js",
      "./src/script/api.js",
      "./src/script/collection.js",
      "./src/script/view/albums-view.js",
      "./src/script/view/stickers-view.js",
      "./src/script/controller.js",
      "./src/script/app.js",
    ],
  },
  dist: {
    baseDir: "./dist",
    css: "main.css",
    js: "app.js",
  },
};

function copyHtml() {
  return src(path.src.html)
    .pipe(dest(path.dist.baseDir))
    .pipe(browsersync.stream());
}

function copyCss() {
  return src(path.src.css)
    .pipe(concat(path.dist.css))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest(path.dist.baseDir))
    .pipe(browsersync.stream());
}

function copyJs() {
  return pipeline(
    src(path.src.js).pipe(concat(path.dist.js)),
    uglify(),
    dest(path.dist.baseDir)
  );
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: path.dist.baseDir,
    },
    port: 3000,
    notify: false,
  });
}

function cleanDist() {
  return src(path.dist.baseDir, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function watchFiles() {
  watch(path.src.html, { ignoreInitial: false }, copyHtml);
  watch(path.src.css, { ignoreInitial: false }, copyCss);
  watch(path.src.js, { ignoreInitial: false }, copyJs);
}

function buildTask() {
  return series(cleanDist, parallel(copyHtml, copyCss, copyJs));
}

function startTask() {
  return series(buildTask(), parallel(watchFiles, browserSync));
}

module.exports.build = buildTask();
module.exports.start = startTask();
