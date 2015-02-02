'use strict';
/**
 * @module lib/mongoose-save-async
 * @description provides a promise version of mongoose's save method.
 *
 * @requires npm:bluebird
 *
 * @example
 * MySchema.plugin(require('../lib/mongoose-save-async'), 'saveAsync');
 */

var Promise = require('bluebird');

module.exports = function (schema, options) {

  var methodName = options || 'saveAsync';

  /**
   * @function lib/mongoose-save-async#saveAsync
   * @description Promised version of mongoose's model.save();
   * @returns {Promise(model)}
   * @example
   * var model = new Model({key: value});
   * model.saveAsync()
   *   .then(function (model) {
   *     // yay!
   *   })
   *   .catch(function (err) {
   *     // uh oh!
   *   });
   */
  schema.method(methodName, function () {
    var self = this;
    return new Promise(function saveAsync(resolve, reject) {
      self.save(function (err, model) {
        if (err) { return reject(err); }
        resolve(model);
      });
    });
  });

};