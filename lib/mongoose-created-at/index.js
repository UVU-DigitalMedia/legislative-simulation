'use strict';
/**
 * @module lib/mongoose-created-at
 * @description Adds a createdAt field that gets set when the model is created
 *
 * @requires defaults
 *
 * @example
 * ModelSchema.plugin(require('./plugins/created-at'), {
 *   createdAtPath: 'createdAt',
 *   index: false
 * });
 */

var defaults = require('defaults');

module.exports = function createdAt(schema, options) {
  // Set the default options
  options = defaults(options, {
    createdAtPath: 'createdAt',
    index: false
  });

  // Set the new path
  /**
   * @member {Date} lib/mongoose-created-at#createdAt - Adds the date the model
   * was created
   */
  schema
    .path(options.createdAtPath, Date)
    .path(options.createdAtPath).default(Date.now);

  // If the index option was set, set the index
  if (options.index) {
    schema.path(options.createdAtPath).index(options.index);
  }

};