var pkg = require('./package.json'),
	gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	inline = require('gulp-inline'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	replace = require('gulp-replace-task');

// wp, html, psd
var build_for = 'for_' + 'psd';

var name = "Leedo",
	slug = "leedo",
	demoUrl = "#",
	purchaseUrl = "#",
	changelogUrl = "##item-description__changelog",
	authorUrl = "https://themeforest.net/user/vlthemes/portfolio",
	supportUrl= "http://vlthemes.ticksy.com/";

gulp.task('stylus', function() {
	return gulp.src('public/css/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('public/css/'));
});

gulp.task('build', function() {
	return gulp.src('public/'+build_for+'.html')
	.pipe(inline({
		base: 'public/',
		js: uglify,
		css: [
			minifyCss,
			autoprefixer({
				browsers:['last 2 versions']
			})
		],
	}))
	.pipe( replace( {
		patterns: [
			{
				match: 'name',
				replacement: name
			},
			{
				match: 'slug',
				replacement: slug
			},
			{
				match: 'demoUrl',
				replacement: demoUrl
			},
			{
				match: 'purchaseUrl',
				replacement: purchaseUrl
			},
			{
				match: 'changelogUrl',
				replacement: changelogUrl
			},
			{
				match: 'authorUrl',
				replacement: authorUrl
			},
			{
				match: 'supportUrl',
				replacement: supportUrl
			},
			{
				match: 'author',
				replacement: pkg.author
			}
		]
	}))
	.pipe(rename('index.html'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('public/css/style.styl', ['stylus']);
});

gulp.task('default', ['watch']);