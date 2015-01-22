'use strict';

var expect = require('expect.js');

var ENV_VARS = [
  'NODE_ENV',
  'DB',
  'PORT',
  'KEY',
  'CERT',
  'LOG',
  'DISABLE_CONSOLE'
];

var origEnv = ENV_VARS.reduce(function (env, envKey) {
  env[envKey] = process.env[envKey];
  return env;
}, {});

function resetEnv() {
  ENV_VARS.map(function (envKey) {
    process.env[envKey] = origEnv[envKey];
  });
}

function loadConfig() {
  return require('../config');
}

function deleteCache(modulePath) {
  delete require.cache[require.resolve(modulePath)];
}

describe('config', function () {

  afterEach(function () {
    resetEnv();
    deleteCache('../config');
    deleteCache('convict');
  });

  it('should load the configuration', function () {
    var config = loadConfig();
    expect(config).to.be.an(Object);
    expect(config.get).to.be.a('function');
  });

  it('should get the required config options with defaults', function () {
    var config = loadConfig();
    expect(config.get('env')).to.be('test');
    expect(config.get('db')).to.be.a('string');
    expect(config.get('host')).to.be.a('string');
    expect(config.get('port')).to.be.a('number');
    expect(config.get('key')).to.be.a('string');
    expect(config.get('cert')).to.be.a('string');
  });

  it('should verify that the ssl key file exists');

  it('should verify that the ssl cert file exists');

});
