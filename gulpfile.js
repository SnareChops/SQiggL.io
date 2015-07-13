var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	through = require('through2'),
	globby = require('globby'),
    webserver = require('gulp-webserver'),
    toJson = require('gulp-to-json'),
    tsify = require('tsify');
	
var mainTsProject = ts.createProject({
    removeComments: false,
    target: 'ES5',
    module: 'commonjs',
    typescript: require('typescript')
});

gulp.task('default', ['build:site', 'docs']);

gulp.task('build:site', function(){
    var stream = through();
    globby(['./ts/**/*.ts'], function(err, entries){
        if(err){
            stream.emit('error', err);
            return;
        }
        return browserify({debug: true, entries: entries, cache: {}, packageCache: {}})
        .plugin('tsify')
        .bundle()
        .pipe(stream);
    });
    return stream
    .pipe(source('app.js'))
    .on('error', function(error){console.log(error.toString()); this.emit('end');})
    .pipe(gulp.dest('./'));
});

gulp.task('docs', function(){
    return gulp.src(['./node_modules/sqiggl/docs/**/*.md'])
    .pipe(toJson({
        filename: './docs.json',
        strip: /^.+\/?\\?sqiggl.io\/?\\?/i
    }));
});

gulp.task('watch', ['docs', 'build:site'], function(){
    gulp.watch('./ts/**/*.ts', ['build:site'])
    .on('change', function(event){
        console.log('File '+event.path+' was '+event.type+', rebuilding...');
    });
});

gulp.task('serve:site', ['clean:tests'], function(){
    gulp.src('./')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('serve:docs', ['clean:tests'], function(){
    gulp.src('./')
    .pipe(webserver({
        open: '#/srcdocs/'
    }));
});