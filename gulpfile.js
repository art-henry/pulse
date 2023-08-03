const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");

// Задача для запуска сервера BrowserSync
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });

  // Следить за изменениями Sass файлов и вызывать задачу компиляции при изменении
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series("sass"));
  // Следить за изменениями HTML файлов и обновлять браузер
  gulp.watch("src/js/**/*.js", gulp.series("scripts"));
  gulp
    .watch("src/*.html")
    .on("change", gulp.series("htmlmin", browserSync.reload));

  // Следить за изменениями изображений и сжимать их при изменении
  gulp.watch("src/img/**/*").on("change", gulp.series("imagemin"));
});

// Задача для компиляции Sass в CSS
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.+(sass|scss)") // Путь к файлам Sass
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError)) // Компиляция Sass в CSS
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css")) // Путь для сохранения скомпилированного CSS
    .pipe(browserSync.stream()); // Обновление браузера при изменении CSS
});

// Задача для перемещения скрипт файлов
gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Задача для перемещения шрифтов
gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*") // Путь к исходным изображениям
    .pipe(gulp.dest("dist/fonts")); // Путь для сохранения сжатых изображений
});

// Задача для перемещения иконок
gulp.task("icons", function () {
  return gulp
    .src("src/icon/**/*") // Путь к исходным изображениям
    .pipe(gulp.dest("dist/icon")); // Путь для сохранения сжатых изображений
});

// Задача для сжатия изображений
gulp.task("imagemin", function () {
  return gulp
    .src("src/img/**/*") // Путь к исходным изображениям
    .pipe(imagemin()) // Сжатие изображений
    .pipe(gulp.dest("dist/img")); // Путь для сохранения сжатых изображений
});

// Задача для минификации HTML
gulp.task("htmlmin", function () {
  return gulp
    .src("src/*.html") // Путь к исходным HTML файлам
    .pipe(htmlmin({ collapseWhitespace: true })) // Минификация HTML
    .pipe(gulp.dest("dist")); // Путь для сохранения минифицированных HTML файлов
});

// Задача для перемещения php файлов
gulp.task("mailer", function () {
  return gulp
    .src("src/mailer/**/*") // Путь к исходным изображениям
    .pipe(gulp.dest("dist/mailer")); // Путь для сохранения сжатых изображений
});

// Задача по умолчанию, которая запускает сервер BrowserSync при запуске gulp
gulp.task(
  "default",
  gulp.parallel(
    "server",
    "sass",
    "scripts",
    "fonts",
    "icons",
    "imagemin",
    "htmlmin",
    "mailer"
  )
);
