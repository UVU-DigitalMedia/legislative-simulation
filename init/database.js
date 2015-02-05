'use strict';
/**
 * @module init/database
 * @description The database initializer. Uses mongoose.
 *
 * @requires npm:bluebird
 * @requires npm:mongoose
 * @requires config
 * @requires lib/log
 *
 * @example
 * require('./init/database')()
 *   .then(function () {
 *     console.log('Connected to database');
 *   })
 *   .catch(function (err) {
 *     console.error(err.stack);
 *   });
 */

var Promise  = require('bluebird');
var mongoose = require('mongoose');
var config   = require('../config');
var log      = require('../lib/log');

module.exports = function initDatabase() {
  return new Promise(function (resolve, reject) {
    log.debug('Initializing connection to database');
    mongoose
      .connect(config.get('db'), function (err) {
        /* istanbul ignore if: app won't even start if can't connect to mongo */
        if (err) { return reject(err); }
        resolve();
      })
      .connection.on('error', reject);
  }).then(function () {
    log.debug('Initialized connection to database');
  });
};
