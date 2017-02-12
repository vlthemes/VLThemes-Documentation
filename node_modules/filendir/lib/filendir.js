var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')

exports.writeFileSync = exports.ws = writeFileSync
exports.writeFileAsync = exports.writeFile = exports.wa = writeFileAsync
exports.mkdirp = mkdirp

/**
 * Synchronous write
 */
function writeFileSync (filename, content, options) {
  if (typeof filename !== 'string') {
    throw new Error('path must be a string')
  }

  mkdirp.sync(path.dirname(filename))
  fs.writeFileSync(filename, content, options)
}

/**
 * Asynchronous write
 */
function writeFileAsync (filename, content, options, cb) {
  if (typeof filename !== 'string') {
    throw new Error('path must be a string')
  }

  if (typeof options === 'function') {
    cb = options
  }

  mkdirp(path.dirname(filename), function (err) {
    if (err && typeof cb === 'function') {
      return cb(err)
    }

    fs.writeFile(filename, content, options, cb)
  })
}
