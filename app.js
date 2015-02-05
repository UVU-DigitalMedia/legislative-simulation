'use strict';
/**
 * @module app
 * @description The main app initializer. All of the app initialization logic is
 * controlled here, meaning the order in which different components are
 * initialized. A promise should be returned when everything is initialized so
 * that that we can know when **everything** is initialized.
 *
 * @requires npm:bluebird
 * @requires init/database
 * @requires init/models
 * @requires init/server
 */

module.exports = require('bluebird').resolve()
  .then(require('./init/models'))
  .then(require('./init/database'))
  .then(require('./init/server'));
