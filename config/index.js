'use strict';
/**
 * @module config
 * This is where the configuration gets loaded.
 * @see http://npmjs.com/package/convict
 *
 * @requires core:path
 * @requires npm:convict
 */

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
  }
});

module.exports = config;
