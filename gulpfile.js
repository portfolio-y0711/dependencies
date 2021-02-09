const gulp = require('gulp');

// /* */ gulp.task('dep', async () => {
//   const npmDist = require('gulp-npm-dist');
//   gulp.src(npmDist(), {base:'./node_modules'})
//     .pipe(gulp.dest('./assets/lib'));
// });

// gulp.task('dep:js', async() => {
//   const concat = require('gulp-concat');
//   const debug = require('gulp-debug');
//   const uglify = require('gulp-uglify');
//   gulp.src([
//     "./assets/lib/jquery-1.12.4.js",
//     "./assets/lib/jquery.dataTables.min.js",
//     "./assets/lib/dataTables.buttons.min.js",
//     "./assets/lib/jszip.min.js",
//     "./assets/lib/buttons.html5.min.js",
//     "./assets/lib/buttons.print.min.js",
//     "./assets/lib/popper.min.js",
//     "./assets/lib/bootstrap.min.js",
//     "./assets/lib/bootstrap-editable.js",
//   ])
//   .pipe(debug({title: '3rd Party Js lib:'}))
//   .pipe(concat('bundle.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('dist/js'));
// });

// gulp.task('dep:css', async() => {
//   const concat = require('gulp-concat');
//   const debug = require('gulp-debug');
//   gulp.src([
//     "./assets/lib/bootstrap.min.css",
//     "./assets/lib/jquery.dataTables.min.css",
//     "./assets/lib/buttons.dataTables.min.css",
//     "./assets/lib/bootstrap-editable.css",
//   ])
//   .pipe(debug({title: '3rd Party Css lib:'}))
//   .pipe(concat('bundle.css'))
//   .pipe(gulp.dest('dist/css'));
// });


// gulp.task('dep:etc', async() => {
//   const debug = require('gulp-debug');
//   return [gulp
//       .src([ "./assets/fonts/**/*.*", ])
//         .pipe(debug())
//         .pipe(gulp.dest('dist/fonts'))
//     ,
//     gulp.src([ "./assets/images/**/*.*", ])
//         .pipe(debug())
//         .pipe(gulp.dest('dist/images'))
//   ]
// })

gulp.task("bundle:pug", function () {
  const pug = require('gulp-pug');
  var data = require('gulp-data');
  return gulp.src("./pug/index.pug")
      .pipe(data((file) => { 
        return { 
          require: require 
        }; 
      }))
      .pipe(pug())
      .pipe(gulp.dest('dist'));
});


gulp.task('bundle:js', function() {
  const webpack = require('gulp-webpack');
  const uglify = require('gulp-uglify');
  return gulp.src('src/index.js')
    .pipe(webpack({
      output: {
        filename: 'app.js',
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});


gulp.task('bundle:scss', async () => {
  const gulp = require('gulp');
  const sass = require('gulp-sass');
  const rename = require('gulp-rename');
  sass.compiler = require('node-sass');
  const uglifycss = require('gulp-uglifycss');
  gulp.src('./scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', gulp.series('bundle:pug', 'bundle:js', 'bundle:scss'));

gulp.task('watch', async () => {
  gulp.watch(['gulpfile.js', 'src/**/*.*', 'scss/**/*.scss', 'pug/**/*.*'], gulp.series('bundle'))
});

const defaultTask = gulp.parallel('bundle', 'watch');

module.exports = {
  default: defaultTask,
}