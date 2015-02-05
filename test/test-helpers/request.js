'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var config     = require('../../config');
module.exports = require('supertest')(config.get('host'));
