var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var image        = require('gulp-image');
var pug          = require('gulp-pug2');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');

var pump         = require('pump');
var browserSync  = require('browser-sync').create();

// These are the input paths for each task.
var paths = {
    images:          ['**/*.@(gif|jpg|png|svg|svgo)', '!fonts/*.svg'],
    fonts:           ['fonts/*'],
    scripts:         ['**/*.js', '!gulpfile.js', '!lib/**/*.js'],
    libs:            ['lib/**/*.js'],
    styles:          ['styles/*.@(scss|sass)'],
    imported_styles: ['**/_*.@(scss|sass)'],
    html_templates:  ['**/*.html'],
    pug_templates:   ['**/*.pug'],
};

// CSS styles are transpiled from SCSS (or SASS if you prefer) and postprocessed
// with autoprefixer.
// Sourcemaps are created along with each resulting css file.
gulp.task('styles', function (cb) {
    pump([
        gulp.src(paths.styles),
        sourcemaps.init(),
        sass(),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        sourcemaps.write('.'),
        gulp.dest('../build/css'),
        browserSync.stream()
    ], cb);
});

// Fonts are copied to destination folder
gulp.task('fonts', function (cb) {
    pump([
        gulp.src(paths.fonts),
        gulp.dest('../build/fonts')
    ], cb);
});

// This task ensures that fonts are updated before reloading browsers.
gulp.task('fonts-watch', ['fonts'], function (done) {
    browserSync.reload();
    done();
});

// Images are optimized then copied to destintation folder.
gulp.task('images', function (cb) {
    pump([
        gulp.src(paths.images),
        image(),
        gulp.dest('../build'),
    ], cb);
});

// This task ensures that images are optimized before reloading browsers.
gulp.task('images-watch', ['images'], function (done) {
    browserSync.reload();
    done();
});

// Script files are just minified, because we are lazy loading with requirejs.
// Sourcemaps are created along with each resulting javascript file.
gulp.task('scripts', function (cb) {
    pump([
        gulp.src(paths.scripts),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('../build'),
    ], cb);
});

// This task ensures that PUG templates are compiled before reloading browsers.
gulp.task('scripts-watch', ['scripts'], function(done) {
    browserSync.reload();
    done();
});

// Vendor libraries are just coped through.
gulp.task('libs', function (cb) {
    pump([
        gulp.src(paths.libs),
        gulp.dest('../build/lib')
    ], cb);
});

// PUG templates are compiled into HTML.
gulp.task('pug-templates', function (cb) {
    pump([
        gulp.src(paths.pug_templates),
        pug(),
        gulp.dest('../build')
    ], cb);
});

// This task ensures that PUG templates are compiled before reloading browsers.
gulp.task('pug-templates-watch', ['pug-templates'], function(done) {
    browserSync.reload();
    done();
});

// HTML templates are just copied to destination.
gulp.task('html-templates', function (cb) {
    pump([
        gulp.src(paths.html_templates),
        gulp.dest('../build')
    ], cb);
});

// This task ensures that HTML templates are processed before reloading browsers.
gulp.task('html-templates-watch', ['html-templates'], function(done) {
    browserSync.reload();
    done();
});

// Watches for source files edits and rebuild the project, causing browser
// live-reloading.
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "../build"
        },
        open: false
    });

    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.imported_styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts-watch']);
    gulp.watch(paths.images, ['images-watch']);
    gulp.watch(paths.fonts, ['fonts-watch']);
    gulp.watch(paths.html_templates, ['html-templates-watch']);
    gulp.watch(paths.pug_templates, ['pug-templates-watch']);
});

// Default builds everything and then watches for source edits.
gulp.task('default', [
    'libs',
    'images',
    'fonts',
    'scripts',
    'styles',
    'pug-templates',
    'html-templates',
    'watch',
]);
