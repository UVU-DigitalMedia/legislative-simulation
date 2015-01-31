'use strict';
/**
 * @module config
 * This is where the configuration gets loaded.
 * @see http://npmjs.com/package/convict
 *
 * @requires core:path
 * @requires npm:convict
 */

var path    = require('path');
var convict = require('convict');

var config = convict({
  /**
   * @member {String} [env='development'] - The application environment. Can be
   * 'production', 'development', or 'test'. It should also be noted that the
   * corresponding env.[env].js will be loaded. These files can override the
   * main configurations.
   * @example
   * config.get('env');
   * @example
   * $ NODE_ENV=production npm start
   * @example
   * $ node app --env production
   */
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env'
  },
  /**
   * @member {String} [db='mongodb://localhost/legislation'] - The database
   * connection url
   * @example
   * config.get('db');
   * @example
   * $ DB=mongodb://localhost/legislation npm start
   * @example
   * $ node app --db mongodb://localhost/legislation
   */
  db: {
    doc: 'The database connection url',
    default: 'mongodb://localhost/legislation',
    env: 'DB',
    arg: 'db'
  },
  /**
   * @member {String} host - The host that can be reached through the browser.
   * Should be defined in `env.` config files.
   * @example
   * config.get('host')
   */
  host: {
    doc: 'The user reachable host with protocol and port',
    format: 'url',
    default: null
  },
  /**
   * @member {Number} [port=4430] - The port to bind.
   * @example
   * config.get('port');
   * @example
   * $ PORT=443 npm start
   * @example
   * $ node app --port 443
   */
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4430,
    env: 'PORT',
    arg: 'port'
  },
  /**
   * @member {String} [key='`pwd`/server.key'] - The path to the ssl key for
   * ssl/tls
   * @example
   * config.get('key');
   * @example
   * $ KEY=/data/keys/key.pem npm start
   * @example
   * $ node app --key /data/keys/key.pem
   */
  key: {
    doc: 'The path to the key.pem for ssl/tls',
    default: path.resolve(__dirname, '..', 'server.key'),
    env: 'KEY',
    arg: 'key'
  },
  /**
   * @member {String} [cert='`pwd`/server.crt'] - The path to the ssl
   * certificate for ssl/tls
   * @example
   * config.get('cert');
   * @example
   * $ CERT=/data/keys/cert.pem npm start
   * @example
   * $ node app --cert /data/keys/cert.pem
   */
  cert: {
    doc: 'The path to the cert.pem for ssl/tls',
    default: path.resolve(__dirname, '..', 'server.crt'),
    env: 'CERT',
    arg: 'cert'
  },
  /**
   * @member {String} [log='info'] - The lowest log level to log. Possible
   * values are 'silly', 'debug', 'verbose', 'info', 'warn', 'error'.
   * @example
   * config.get('logLevel');
   * @example
   * $ LOG=warn npm start
   * @example
   * $ node app --log verbose
   */
  logLevel: {
    doc: 'The level at which log messages should be saved',
    format: ['silly', 'debug', 'verbose', 'info', 'warn', 'error'],
    default: 'info',
    env: 'LOG',
    arg: 'log'
  },
  /**
   * @member {Boolean} [disableConsole=false] - Whether or not to disable
   * console logging
   * @example
   * config.get('disableConsoleLog');
   * @example
   * $ DISABLE_CONSOLE=true npm start
   * @example
   * $ node app --disable-console
   */
  disableConsole: {
    doc: 'Whether or not to disable console logging',
    format: Boolean,
    default: false,
    env: 'DISABLE_CONSOLE',
    arg: 'disable-console'
  }
});

config.load(require('./env.default'));
config.load(require('./env.' + config.get('env')));

config.validate();

module.exports = config;
