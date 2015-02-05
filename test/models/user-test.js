'use strict';

var expect = require('expect.js');
var app    = require('../test-helpers/app');
var User;

describe('User model', function () {

  before(function () {
    return app.init().then(function () {
      User = require('mongoose').model('User');
    });
  });

  var userInfo = {
    email: 'test@email.com',
    password: 'testpassword'
  };

  it('should hash given password', function () {
    return User
      .create(userInfo)
      .then(function (user) {
        expect(user).to.be.an(Object);
        expect(user.email).to.be(userInfo.email);
        // TODO maybe there is a better way to check to see if it's hashed?
        expect(user.password).to.not.be(userInfo.password);
      });
  });

  it('should authenticate given password', function () {
    var user;
    return User
      .findOne({email: userInfo.email}).exec()
      .then(function (foundUser) {
        user = foundUser;
        expect(user).to.be.an(Object);
        return user.authenticate(userInfo.password);
      })
      .then(function (isMatch) {
        expect(isMatch).to.be(true);
        return user.authenticate(userInfo.password + '1');
      })
      .then(function (isMatch) {
        expect(isMatch).to.be(false);
      });
  });

  it('should not rehash unedited password', function () {
    var password;
    return User
      .findOne({email: userInfo.email}).exec()
      .then(function (user) {
        expect(user).to.be.an(Object);
        user.email = 'test2@email.com';
        userInfo.email = user.email;
        password = user.password;
        return user.saveAsync();
      })
      .then(function (user) {
        expect(user.email).to.be(userInfo.email);
        expect(user.password).to.be(password);
      });
  });

  it('should fail with invalid password (length)', function () {
    var password = '';
    for (var i = 1; i < User.passwordMinLength; i += 1) {
      password += String(i);
    }
    return User
      .create({email: 'test1@email.com', password: password})
      .then(
        function (user) {
          throw new Error('Error should have happened');
        },
        function (err) {
          expect(err).to.be.an(Error);
          expect(err.name).to.be('ValidationError');
          expect(err.errors.password.path).to.be('password');
        }
      );
  });

  it('should fail with invalid email', function () {
    return User
      .create({email: 'test1', password: '1234567890'})
      .then(
        function (user) {
          throw new Error('Error should have happened');
        },
        function (err) {
          expect(err).to.be.an(Error);
          expect(err.name).to.be('ValidationError');
          expect(err.errors.email.path).to.be('email');
        }
      );
  });

  it('should fail with duplicate email', function () {
    return User
      .create(userInfo)
      .then(
        function (user) {
          throw new Error('Error should have happened');
        },
        function (err) {
          expect(err).to.be.an(Error);
          expect(err.name).to.be('MongoError');
          expect(err.code).to.be(11000);
        }
      );
  });

});
