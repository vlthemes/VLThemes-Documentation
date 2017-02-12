var fs = require('fs')
var rm = require('rimraf')
var TMP_FOLDER = 'tmp_test'
var path = require('path')
var filendir = require('./filendir')
var expect = require('chai').expect
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var mkdirp = require('mkdirp')

chai.use(sinonChai)

describe('Filendir', function () {
  var sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox = sinon.sandbox.restore()
    rm.sync(TMP_FOLDER)
  })

  describe('shorthand methods', function () {
    it('should have a shorthand method for asynchronous write (wa)', function () {
      expect(filendir.wa).to.equal(filendir.writeFile)
      expect(filendir.wa).to.equal(filendir.writeFile)
      expect(filendir.wa).to.equal(filendir.writeFileAsync)
    })

    it('should have a shorthand method for synchronous write (ws)', function () {
      expect(filendir.ws).to.equal(filendir.writeFileSync)
    })
  })

  describe('synchronous write', function () {
    it('should write and create missing directories given a full path', function () {
      var read
      var content = 'hello world'
      var fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')

      filendir.ws(fullpath, content)
      read = fs.readFileSync(fullpath, 'utf8')

      expect(read).to.equal(content)
    })

    it('should throw errors like fs.writeFileSync', function () {
      expect(shouldThrow).to.throw()

      function shouldThrow () {
        var content = 'hello world'
        filendir.ws(null, content)
      }
    })

    it('should allow to use the same options than original fs', function () {
      var fsWriteSpy = sandbox.spy(fs, 'writeFileSync')
      var content = 'hello world'
      var fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      var options = 'utf8'

      filendir.ws(fullpath, content, options)

      expect(fsWriteSpy).to.be.calledWith(fullpath, content, options)
    })
  })

  describe('asynchronous write', function () {
    it('should write and create missing directories given a full path', function (done) {
      var content = 'hello world with callback'
      var fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      var cb = function (err) {
        if (err) {
          console.log(err)
        }
        var read = fs.readFileSync(fullpath, 'utf8')
        expect(read).to.equal(content)
        done()
      }

      filendir.wa(fullpath, content, cb)
    })

    it('should throw errors like fs.writeFile', function () {
      expect(shouldThrow).to.throw()

      function shouldThrow () {
        var content = 'hello world'
        filendir.wa(null, content)
      }
    })

    it('should allow to use the same options than original fs', function (done) {
      var fsWriteSpy = sandbox.spy(fs, 'writeFile')
      var content = 'hello world'
      var fullpath = path.join(TMP_FOLDER, 'nested_dir', 'test_file.txt')
      var options = 'utf8'
      var cb = function (err) {
        if (err) {
          console.log(err)
        }
        expect(fsWriteSpy).to.be.calledWith(fullpath, content, options, cb)
        done()
      }

      filendir.wa(fullpath, content, options, cb)
    })
  })

  describe('mkdirp', function () {
    it('should be available', function () {
      expect(filendir.mkdirp).to.equal(mkdirp)
    })
  })
})
