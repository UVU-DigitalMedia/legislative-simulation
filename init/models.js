'use strict';
/**
 * @module init/models
 * @description Initializes the application models. Reads the `models/`
 * directory to dynamically load new models. Every `.js` file in that directory
 * (not including sub-directories), should be exported as a mongoose schema. The
 * name of the model will be determined by the name of the model file. Example:
 * if you have a model file named `user.js`, the schema will be turned into
 * the `User` model (mongoose.model('User')). A model file named `good-thing.js`
 * will become `GoodThing`. Make sure that all of the files are all lowercase
 * with words separated by hyphens, or your models will not load as expected.
 *
 * @requires core:path
 * @requires core:fs
 * @requires npm:bluebird
 * @requires npm:mongoose
 * @requires lib/log
 */

var path     = require('path');
var Promise  = require('bluebird');
var fs       = Promise.promisifyAll(require('fs'));
var mongoose = require('mongoose');
var log      = require('../lib/log');

// Directory where all of the models live.
var MODELS_DIR = path.resolve(__dirname, '..', 'models');

module.exports = function initModels() {
  log.debug('Loading models from %s', MODELS_DIR);
  log.debug('Finding files in %s', MODELS_DIR);

  return fs.readdirAsync(MODELS_DIR).then(function (files) {
    log.debug('Found %s items in %s', files.length, MODELS_DIR);

    // Loop through the files to require each one in our models
    files.map(function (file) {

      var extension = path.extname(file);

      // Non .js file (such as folders) will be excluded.
      if (extension !== '.js') {
        return log.debug('%s exluded from models, not a .js file', file);
      }

      // Get the full path that we'll use when we require it.
      var fullPath  = path.join(MODELS_DIR, file);
      // Get a CamelCase version of the filename
      var modelName = path.basename(file, extension)
        .split('-')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        })
        .join('');

      // Load the actual model module
      log.debug('Loading schema file from %s', fullPath);
      var schema = require(fullPath);
      log.debug('Loaded schema file from %s', fullPath);

      /** istanbul ignore if: Models should all be loaded correctly */
      if (!(schema instanceof mongoose.Schema)) {
        return log.warn('%s excluded from models, not a mongoose schema', file);
      }

      // Load the schema as a mongoose model.
      mongoose.model(modelName, schema);
      log.debug('Initialized "%s" model', modelName);

    });

    log.debug('Loaded models from %s', MODELS_DIR);
  });
};
