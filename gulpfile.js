var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    filter = require('gulp-filter'),
    gutil = require('gulp-util');

gulp.task('styles', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ 
      loadPath: 'src/styles',  
      style: 'expanded', 
      sourcemap: true, 
      errLogToConsole: true,
      sourceComments : 'normal',
      sourcemapPath: 'src/styles'
    }))
    .on('error', function (err) { console.log(err.message); })    
    .pipe(gulp.dest('src/styles'))
	.pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream:true}))
});

gulp.task('scripts', function () {
  return gulp.src('src/scripts/*.js')
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', function () {
	return gulp.src('src/html/*.html')
	.pipe(gulp.dest('dist/html'));
});

gulp.task('images', function () {
	return gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'));
});

gulp.task('serve', function () {
  browserSync.init(null, {
    server: {
      baseDir: 'src',
      directory: true
    },
    debugInfo: false,
    open: true,
  });
});

gulp.task('watch', ['serve'], function () {
  // watch for changes
  gulp.watch('src/html/*.html', reload);
  gulp.watch('src/styles/**/*.scss', ['styles', reload]);
  gulp.watch('src/scripts/**/*.js', reload);
  gulp.watch('src/images/**/*.*', reload);
});