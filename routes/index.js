'use strict';

var router = module.exports = require('express').Router();



router.use(function (req, res, next) {
  res.status(404).json({
    error: 'Not Found'
  });
});

router.use(function (err, req, res, next) {
  res.status(500).json({
    error: 'Server Error'
  });
});
