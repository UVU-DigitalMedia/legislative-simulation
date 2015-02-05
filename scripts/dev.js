#!/usr/bin/env node
'use strict';

var fs         = require('fs');
var path       = require('path');
var configPath = path.resolve(__dirname, '..', 'config');
var SRC        = path.join(configPath, 'env.default.js');
var DEST       = path.join(configPath, 'env.development.js');

fs.createReadStream(SRC).pipe(fs.createWriteStream(DEST));
