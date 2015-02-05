'use strict';
/**
 * @class User
 * @description The User model. Provides a way to restrict access to specific
 * API endpoints
 *
 * @requires core:util
 * @requires npm:mongoose
 * @requires npm:mongoose-validator
 * @requires lib/hash
 * @requires lib/mongoose-save-async
 * @requires lib/mongoose-created-at
 *
 * @borrows lib/mongoose-save-async#saveAsync as #saveAsync
 * @borrows lib/mongoose-created-at#createdAt as #createdAt
 */

var util     = require('util');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var hash     = require('../lib/hash');
var Schema   = mongoose.Schema;

var SALT_WORK_FACTOR    = 10;
var PASSWORD_MIN_LENGTH = 8;
var PASSWORD_MAX_LENGTH = 256;

var UserSchema = module.exports = new Schema({
  /** @member {String} User#email - The user's email */
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Must be a valid email address'
      })
    ]
  },
  /** @member {String} User#password - The user's hashed password */
  password: {
    type: String,
    required: 'Password is required',
    validate: [
      validate({
        validator: 'isLength',
        arguments: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],
        message: util.format(
          'Password must be between %s and %s characters long',
          PASSWORD_MIN_LENGTH,
          PASSWORD_MAX_LENGTH
        )
      })
    ]
  }
});

UserSchema.plugin(require('../lib/mongoose-save-async'));
UserSchema.plugin(require('../lib/mongoose-created-at'));

/** @member {String} User.passwordMinLength - The min length for passwords */
UserSchema.statics.passwordMinLength = PASSWORD_MIN_LENGTH;
/** @member {String} User.passwordMaxLength - The max length for passwords */
UserSchema.statics.passwordMaxLength = PASSWORD_MAX_LENGTH;

// This is where the password gets hashed
UserSchema.pre('save', function (next) {
  var model = this;
  // If the password wasn't changed, do nothing
  if (!model.isModified('password')) { return next(); }

  hash.hash(model.password, SALT_WORK_FACTOR)
    .then(function (hashedPassword) {
      model.password = hashedPassword;
    })
    .then(next, next);
});

/**
 * @function User#authenticate
 * @description authenticates a model given an unhashed password
 * @param {String} comparePassword - The unhashed password to check against
 * the already saved hashed password
 * @return {Promise} A Promise that resolves to a Boolean, isMatch. `true` if
 * the passwords match, `false` if they don't
 * @example
 * User.findOne({email: 'test@xkcd.com'}).exec()
 *   .then(function (user) {
 *     if (!user) { return false; }
 *     return user.authenticate('correct horse battery staple');
 *   })
 *   .then(function (isMatch) {
 *     if (isMatch) {
 *       // do something because the user is authenticated
 *     }
 *   });
 */
UserSchema.methods.authenticate = function authenticate(comparePassword) {
  return hash.check(comparePassword, this.password);
};
