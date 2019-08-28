// Import Dependencies
const gulp = require('gulp')
const rename = require('gulp-rename')
// CSS
const autoprefixer = require('autoprefixer')
const cleancss = require('gulp-clean-css')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
// JS
const concat = require('gulp-concat')
const deporder = require('gulp-deporder')
// TS
// ESLINT
const eslint = require('gulp-eslint')
// JSDoc
const jsdoc = require('gulp-jsdoc3')

// Import Modules
const winston = require('./config/winston.config')
const {
  jsDoc: jsdocConfig
} = require('./config/activeConfig')

/*
 * Gulp Sripts
 * outputStyle: compressed, nested, compact, expanded
 * .on(Error) -> sass.logError
 * cleancss() -> format: beautify, keep-breaks
 */
const css = (done) => {
  gulp.src('views/scss/*.+(scss|sass)') // Input
    .pipe(concat('main.css')
      .on('error', (err) => {
        winston.error(`gulpfile.js/css():pipe(concat): ${err}`) // Log Error to File
      })) // Merge All Sources
    .pipe(sass({
        outputStyle: 'compressed',
        precision: 3,
        errLogToConsole: true
      })
      .on('error', (err) => {
        winston.error(`gulpfile.js/css():pipe(sass): ${err}`) // Log Error to File
      }))
    .pipe(postcss([
        autoprefixer({
          overrideBrowserslist: ['Last 2 Versions', '> 2%']
        }),
        cssnano
      ])
      .on('error', (err) => {
        winston.error(`gulpfile.js/css():pipe(postcss): ${err}`) // Log Error to File
      }))
    .pipe(cleancss({
        format: 'beautify' // Format Output
      })
      .on('error', (err) => {
        winston.error(`gulpfile.js/css():pipe(cleancss): ${err}`) // Log Error to File
      }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css/')) // Output
  done()
}

const js = (done) => {
  // Build main.min.js
  gulp.src('views/javascript/*.js') // Input
    .pipe(deporder()
      .on('error', (err) => {
        winston.error(`gulpfile.js/js():pipe(deporder): ${err}`) // Log Error to File
      }))
    .pipe(concat('main.js') // Merge All Sources
      .on('error', (err) => {
        winston.error(`gulpfile.js/js():pipe(concat): ${err}`) // Log Error to File
      }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/js/')) // Output

  // Build part.min.js

  done()
}

const esLint = (done) => {
  gulp.src(['config/**']) // Input
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.result(() => {}))
    .pipe(gulp.dest('config/')) // Output

  gulp.src(['controllers/**']) // Input
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.result(() => {}))
    .pipe(gulp.dest('controllers/')) // Output

  gulp.src(['models/**', '!**/*.ts']) // Input
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.result(() => {}))
    .pipe(gulp.dest('models/')) // Output

  // TODO: Add Lint for Public Folder
  done()
}

const jsDoc = (done) => {
  gulp.src('./')
    .pipe(jsdoc(jsdocConfig))

  done()
}

const bootStrap = (done) => {
  // Build CSS
  gulp.src('custom/bootstrap.scss') // Input
    .pipe(sass()
      .on('error', (err) => {
        winston.error(`gulpfile.js/bootstrapCSS():pipe(sass): ${err}`) // Log Error to File
      }))
    .pipe(postcss([
        autoprefixer(),
        cssnano
      ])
      .on('error', (err) => {
        winston.error(`gulpfile.js/bootstrapCSS():pipe(postcss): ${err}`) // Log Error to File
      }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css')) // Output

  // Build JS
  gulp.src(['node_modules/jquery/dist/jquery.min.+(js|map)', 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.+(js|js.map)']) // Input
    .pipe(gulp.dest('public/js')) // Output

  done()
}

const fontAwesome = (done) => {
  // Move CSS
  gulp.src(['node_modules/font-awesome/css/font-awesome.min.css']) // Input
    .pipe(gulp.dest('public/css')) // Output

  // Move Fonts
  gulp.src(['node_modules/font-awesome/fonts/*']) // Input
    .pipe(gulp.dest('public/fonts')) // Output

  done()
}

const toastr = (done) => {
  // Move CSS
  gulp.src(['node_modules/toastr/build/toastr.min.css']) // Input
    .pipe(gulp.dest('public/css')) // Output

  // Move JS
  gulp.src(['node_modules/toastr/build/toastr.min.js', 'node_modules/toastr/build/toastr.js.map']) // Input
    .pipe(gulp.dest('public/js')) // Output

  done()
}

exports.css = css
exports.js = js
exports.esLint = esLint
exports.jsDoc = jsDoc
exports.bootstrap = bootStrap // Rebuild Bootstrap
exports.fontAwesome = fontAwesome // Copy FontAwesome
exports.toastr = toastr // Copy Toastr

exports.build = gulp.series(js, css, fontAwesome, bootStrap, toastr) // Build Task
