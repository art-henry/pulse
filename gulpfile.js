const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Задача для запуска сервера BrowserSync
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });

  // Следить за изменениями Sass файлов и вызывать задачу компиляции при изменении
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.series("sass"));
  // Следить за изменениями HTML файлов и обновлять браузер
  gulp.watch("src/*.html").on("change", browserSync.reload);
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
    .pipe(gulp.dest("src/css")) // Путь для сохранения скомпилированного CSS
    .pipe(browserSync.stream()); // Обновление браузера при изменении CSS
});

// Задача по умолчанию, которая запускает сервер BrowserSync при запуске gulp
gulp.task("default", gulp.series("server", "sass"));
