var pkg = require('./package.json'),
	gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	inline = require('gulp-inline'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	replace = require('gulp-replace-task');

var name = "Folim",
	slug = "folim",
	demoUrl = "http://vlthemes.com/#folim_wp",
	purchaseUrl = "http://themeforest.com/cart/add_items?ref=vlthemes&item_ids=21992924",
	changelogUrl = "https://themeforest.net/item/folim-clean-minimalist-portfolio-wordpress-theme/21992924#item-description__changelog",
	authorUrl = "https://themeforest.net/user/vlthemes/portfolio",
	supportUrl= "http://vlthemes.ticksy.com/";

gulp.task('stylus', function() {
	return gulp.src('public/css/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('public/css/'));
});

gulp.task('build', function() {
	return gulp.src('public/index.html')
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
	.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('public/css/style.styl', ['stylus']);
});

gulp.task('default', ['watch']);