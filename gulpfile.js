
// Add dependencies
const gulp = require('gulp');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const series = require('stream-series');
const buffer = require('gulp-buffer');
const inject = require('gulp-inject');
const del = require('del');
const merge = require("merge-stream");

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const source = require('vinyl-source-stream');

const argv = require('minimist')(process.argv.slice(2));

// Configuration
const configuration = {
    paths: {
        src: {
            html: './src/*.html',
            images: './src/images/**/*.png',
            css: [
                './src/style/*.scss'
            ],
            manifest: './src/manifest.json',
        },
        dist: './dist',
        node_modules: './node_modules/'
    }
};

gulp.task('root', function () {
    return merge([gulp.src([
        configuration.paths.src.manifest
    ]).pipe(gulp.dest(configuration.paths.dist)),
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
    ]);
});

gulp.task('images', function () {
    return gulp.src(configuration.paths.src.images)
        .pipe(gulp.dest(configuration.paths.dist + '/images'));
});

// Gulp task to concatenate our scss files
gulp.task('scss', gulp.series(function (done) {
    gulp.src(configuration.paths.src.css)
        .pipe(sass({
            includePaths: ['node_modules/'] // added includePaths to resolve scss partials from node modules
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest(configuration.paths.dist + '/css'))
    done();
}));

gulp.task('scsswatch', gulp.series(function (done) {
    gulp.watch('./src/style/**/*.scss', gulp.series('clean-css', 'scss', 'inject'));
    done();
}));

gulp.task('clean:libs', gulp.series(function (done) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([configuration.paths.dist + "/lib"], done);
}));

gulp.task("copy:libs", gulp.series("clean:libs", function () {
    const production = process.env.NODE_ENV === "production";
    const mobxLib = production ? "mobx/lib/mobx.umd.min.js" : "mobx/lib/mobx.umd.js"
    const libs = [];

    libs.push(
        gulp.src(configuration.paths.node_modules + mobxLib)
            .pipe(gulp.dest(configuration.paths.dist + "/lib/mobx"))
    );

    return merge(...libs);
}));

gulp.task('bundle', function () {
    return rollup('rollup.config.js')
        .pipe(source("app.js")) // name of the output file
        .pipe(gulp.dest('dist/js')); // location to put the output file
});

gulp.task('bundle-background', function () {
    return rollup('rollup-background.config.js')
        .pipe(source("background.js"))
        .pipe(gulp.dest('dist/js')); // location to put the output file
});

gulp.task('bundle-content-mantis', function () {
    return rollup('rollup-content-mantis.config.js')
        .pipe(source("contentscript.js"))
        .pipe(gulp.dest('dist/js')); // location to put the output file
});

gulp.task('tswatch', gulp.series(function (done) {
    gulp.watch(['./src/**/*.ts', './src/**/*.tsx'], gulp.series('clean-js', gulp.parallel('bundle', 'bundle-background'), 'inject'));
    done();
}));

gulp.task('clean-js', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist/js'], cb);
});

gulp.task('clean-css', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist/js'], cb);
});

gulp.task('clean-dist', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist'], cb);
});

gulp.task('set-node-env', function (done) {
    process.env.NODE_ENV = argv.env;
    done();
});

// Gulp default task
gulp.task('default', gulp.series(
    gulp.parallel('clean-dist', 'set-node-env'),
    gulp.parallel('bundle', 'bundle-background', 'bundle-content-mantis', 'scss', 'copy:libs'),
    gulp.parallel('root', 'images')
));

gulp.task('watch', gulp.series('default', gulp.parallel('tswatch', 'scsswatch')));