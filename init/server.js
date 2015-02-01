'use strict';
/**
 * @module init/server
 * @description The server initializer. Sets up the initial middleware and ssl
 * connection stuff.
 * @see http://expressjs.com/
 * @see http://npmjs.com/package/express
 * @see http://npmjs.com/package/compression
 * @see http://npmjs.com/package/body-parser
 * @see http://npmjs.com/package/method-override
 *
 * @requires core:fs
 * @requires core:https
 * @requires npm:bluebird
 * @requires npm:express
 * @requires npm:compression
 * @requires npm:body-parser
 * @requires npm:method-override
 * @requires config
 * @requires lib/log
 * @requires routes
 */

var fs             = require('fs');
var https          = require('https');
var Promise        = require('bluebird');
var express        = require('express');
var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var config         = require('../config');
var log            = require('../lib/log');

var app            = express();
var KEY_PATH       = config.get('key');
var CERT_PATH      = config.get('cert');

// These are the https options. The configuration for the key and cert are
// filepaths to the ssl key and certificate files.
log.debug('Reading ssl key "%s" and cert "%s"', KEY_PATH, CERT_PATH);
var options  = {
  key: fs.readFileSync(KEY_PATH),
  cert: fs.readFileSync(CERT_PATH)
};
log.debug('Successfully read ssl key and cert');

module.exports = function initServer() {

  // This is where we set all of the top level middleware such as loggers,
  // compressors, parsers, rate limiters and such.

  /** @todo TODO add rate limiting middleware */
  /** @todo TODO add logging middleware */
  app.disable('x-powered-by');
  app.set('json spaces', 2);
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // This is our main api router
  /** @see router */
  log.debug('Initializing routes');
  app.use(require('../routes'));
  log.debug('Initialized routes');

  // return the promise of a new server
  return new Promise(function (resolve, reject) {
    log.debug('Initializing https server');
    https.createServer(options, app)
      .listen(config.get('port'))
      .on('listening', resolve)
      .on('error', reject);
  }).then(function () {
    log.debug('Initialized https server');
    log.info('Server started at %s', config.get('host'));
  });

};
