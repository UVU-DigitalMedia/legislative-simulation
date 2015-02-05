'use strict';

var expect = require('expect.js');
var hash   = require('../../lib/hash');

describe('hash', function () {

  it('should hash a string', function () {
    var str = 'correct horse battery staple';
    return hash.hash(str).then(function (hashedStr) {
      expect(str).to.not.be(hashedStr);
    });
  });

  it('should check to see if a string matches hashed str', function () {
    var str = 'correct horse battery staple';
    return hash.hash(str)
      .then(function (hashedStr) {
        return hash.check(str, hashedStr);
      })
      .then(function (isMatch) {
        expect(isMatch).to.be(true);
      });
  });

  it('should fail if a string doesn\'t match', function () {
    var str = 'correct horse battery staple';
    return hash.hash(str)
      .then(function (hashedStr) {
        return hash.check(str + 'i', hashedStr);
      })
      .then(function (isMatch) {
        expect(isMatch).to.be(false);
      });
  });

  it('should take a custom salt work factor', function () {
    this.timeout(0);
    var str = 'correct horse battery staple';
    var now = Date.now();
    return hash.hash(str, 1)
      .then(function () {
        expect(Date.now() - now).to.be.lessThan(10);
        now = Date.now();
        return hash.hash(str, 13);
      })
      .then(function () {
        expect(Date.now() - now).to.be.greaterThan(400);
      });
  });

});
