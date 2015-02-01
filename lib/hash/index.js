'use strict';
/**
 * @module lib/hash
 * @description provides input hashing and authentication helpers
 *
 * @requires npm:bluebird
 * @requires npm:bcrypt
 */

var Promise = require('bluebird');
var bcrypt  = Promise.promisifyAll(require('bcrypt'));

/**
 * @description A helper function to hash a value with a given salt
 * @params {String} value - The string to be hashed
 * @params {Number} [saltWorkFactor=10] - The number of rounds the hashing will
 * take place. Must be a positive integer greater than 0.
 * @return {Promise} -> {String} The hashed value
 * @example
 * hash('correct horse battery stable')
 *   .then(function (hashed) {
 *     model.password = hashed;
 *     return model.save();
 *   });
 */
exports.hash = function hash(value, saltWorkFactor) {
  saltWorkFactor = saltWorkFactor || 10;
  return bcrypt
    .genSaltAsync(saltWorkFactor)
    .then(function (salt) {
      return bcrypt.hashAsync(value, salt);
    });
};

/**
 * @function check
 * @description Checks to see if an unhashed value will match the hashed version
 * of something.
 * @params {String} input - the input value to check
 * @params {String} hashed - the hashed version that the input should match when
 * hashed
 * @return {Promise} -> {Boolean} Whether or not it was a match
 * @example
 * hash.check('312128asdfaw203', model.password)
 *   .then(function (isMatch) {
 *     // do something with the value
 *   });
 */
exports.check = function check(input, hashed) {
  return bcrypt.compareAsync(input, hashed);
};
