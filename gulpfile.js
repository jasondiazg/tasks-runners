var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var merge = require('merge-stream');
var replace = require('gulp-string-replace');
var del = require('del');

//====================================================================================================================

// PACKAGE APP
gulp.task('clean-dist', () => {
    return del(['dist/**/*']);
});

gulp.task('dist', ['clean-dist'], ()=>
{
    // Transfer files
    var jsFiles = gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js'])
                        .pipe(gulp.dest('dist/js'));

    var cssFiles = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
                        .pipe(gulp.dest('dist/css'));

    var minApp = gulp.src('app/app.js')
                    .pipe(concat('app.min.js'))
                    .pipe(uglify().on('error', (e)=>{ console.log('Error al minificar/ofuscar app: ' + e);}))
                    .pipe(gulp.dest('dist/app'));
    
    var index = gulp.src('index.html')
                            .pipe(replace('node_modules/bootstrap/dist/css/bootstrap.min.css', 'css/bootstrap.min.css'))
                            .pipe(replace('node_modules/jquery/dist/jquery.min.js', 'js/jquery.min.js'))
                            .pipe(replace('node_modules/bootstrap/dist/js/bootstrap.min.js', 'js/bootstrap.min.js'))
                            .pipe(replace('taskrunner', 'gulp'))
                            .pipe(replace('app/app.js', 'app/app.min.js'))
                            .pipe(gulp.dest('dist'));
    
    return merge(jsFiles, cssFiles, minApp, index);
});


//====================================================================================================================
//====================================================================================================================