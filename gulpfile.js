var gulp = require('gulp'),
 {resolve} = require('path'),
sass = require('gulp-sass'),//编译sass
minify = require('gulp-uglify'),//代码啊压缩
rename = require('gulp-rename'),//修改名称
pump = require('pump'),
autoprefixer = require('gulp-autoprefixer'),
sequence = require('run-sequence'),
clean = require('gulp-clean'),
minifyCss = require('gulp-clean-css'),
watch = require('gulp-watch'),
changed = require('gulp-changed'),
browserSync = require('browser-sync').create(),
livereload = require('gulp-livereload'),
sourcemaps = require('gulp-sourcemaps'),
plumber = require('gulp-plumber'),
compass = require('gulp-compass');
// 浏览器同步

gulp.task('default',function(){
    pump([
        gulp.src(['**/*.scss','!node_modules/**/*.*']),
        watch(['**/*.scss','!node_modules/**/*.*']),
        plumber({
            erroeHanlder:function(error){
                 this.emit('end')
            }
        }),
        sass(),
        autoprefixer([
          'iOS >= 8',
          'Android >= 4.1'
        ]),
        rename((path) => path.extname = '.wxss'),
        gulp.dest(resolve(__dirname))
    ])
})
