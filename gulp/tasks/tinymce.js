var gulp = require('gulp')
var config = require('../config');

gulp.task('tinymce', function(){
  gulp.src(['node_modules/tinymce'])
  .pipe(gulp.dest(config.scripts.dest));
});
