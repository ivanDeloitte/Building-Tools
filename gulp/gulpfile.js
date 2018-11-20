var gulp = require('gulp');
var browserify = require('browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('js', function () {
        browserify({entries: './src/js/app.js'})
        .transform("babelify", { presets: ["@babel/preset-env"] }).bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

gulp.task('css', function () {
    gulp.src('src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
})

gulp.task('server', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src("src/html/index.html")
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch(['src/html/index.html'], ['html']);
    gulp.watch(['src/css/**'], ['css']);
    gulp.watch(['src/js/**'], ['js']);
  });

gulp.task('default', function () {
    gulp.run('server', 'js', 'css', 'html' , 'watch');
})