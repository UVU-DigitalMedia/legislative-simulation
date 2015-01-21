'use strict';

var expect = require('expect.js');

function loadConfig() {
  delete require.cache[require.resolve('../config')];
  return require('../config');
}

describe('config', function () {

  it('should load the configuration', function () {
    var config = loadConfig();
    expect(config).to.be.an(Object);
    expect(config.get).to.be.a('function');
  });

  it('should get the required config options');

  it('should verify that the ssl key file exists');

  it('should verify that the ssl cert file exists');

});
