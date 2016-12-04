global.hostname = "localhost";

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		pump = require('pump'),
		watch = require('gulp-watch'),
		browserSync = require("browser-sync"),
		eslint = require("gulp-eslint"),
		reload = browserSync.reload;

var patch = {
	src: {
		html: '*.html',
		css: 'css_src/**/*.css',
		js: 'js_src/*.js'
	}
};

var config = {
    server: {
        baseDir: ""
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "devel43"
};



gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('webserver:reload', function() {
	browserSync.reload(["*.css", "*.html", "*.js"]);
})


gulp.task('styles', function () {
	gulp.src(patch.src.css)
	.pipe(autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('css'))
	.pipe(reload({stream: true}));
});

gulp.task('common-js', function() {
	gulp.src(patch.src.js)
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js'))
		.pipe(reload({stream: true}));
});



gulp.task('build', ['styles', 'common-js']);



gulp.task('watch', function() {
	watch([patch.src.css], function(event, cb) {
		gulp.start('styles');
	});
	watch([patch.src.js], function(event, cb) {
		gulp.start('common-js');
	});
});



gulp.task('default', ['build', 'webserver', 'watch'], function() {

});
