'use strict';

var expect  = require('expect.js');
var app     = require('../test-helpers/app');
var request = require('../test-helpers/request');

describe('Base api', function () {

  before(function () {
    return app.init();
  });

  it('should return 404 response', function (done) {
    return request
      .get('/v1/asdfasdfasdf')
      .expect(404, done);
  });

});
