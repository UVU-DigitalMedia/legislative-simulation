'use strict';

var Promise  = require('bluebird');
var app      = require('../../app');
var mongoose = require('mongoose');

exports.init = function () {
  return app.then(function () {
    Promise.all(Object.keys(mongoose.models).map(function (modelName) {
      return mongoose.model(modelName).remove().exec();
    }));
  });
};
