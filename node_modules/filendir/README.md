Filendir
========
Write a file given a full path. Create the missing directories if necessary.

-----------

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/AoDev/Filendir.svg)](https://travis-ci.org/AoDev/Filendir)

API
----
Filendir exposes an asynchronous and a synchronous write method.

It also exposes `mkdirp to create directories only, if you need it.


### Synchronous write
* __filendir.ws__ (shorthand)
* __filendir.writeFileSync__

Apart from creating the missing directories,
it has the same behaviour and interface than node `fs.writeFileSync`.

```javascript
// signature
filendir.writeFileSync(filename, data[, options])
```

[See fs.writeFileSync in Node.js site](https://nodejs.org/api/fs.html#fs_fs_writefilesync_filename_data_options)


**Example**

```javascript
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let','s', 'nest','some','directories','myfile.txt')
var content = 'Hello World'

filendir.ws(filename, content)
```

### Asynchronous write
* __filendir.wa__ (shorthand)
* __filendir.writeFile__
* filendir.writeFileAsync (deprecated, still there for backward compatibility)

Apart from creating the missing directories,
it has the same behaviour and interface than node `fs.writeFile`.

```javascript
// signature
filendir.writeFile(filename, data[, options], callback)
```

[See fs.writeFile in Node.js site](https://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback)

**Example**

```javascript
var path = require('path')
var filendir = require('filendir')
var filename = path.join('let','s', 'nest','some','directories','myfile.txt')
var content = 'Hello World'

filendir.wa(filename, content, function (err) {
  if (!err) {
    console.log('File written!')
  }
})
```

### filendir.mkdirp

Credits to Substack. Would have been harder to do this without it.

See https://www.npmjs.org/package/mkdirp
