/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const Member = require('../../models/member');

describe('Member model tests', function() {

  it('should be invalid if name is empty', function(done) {
    const member = new Member();

    member.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if username is empty', function(done) {
    const member = new Member();

    member.validate(function(err) {
      expect(err.errors.username).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', function(done) {
    const member = new Member();

    member.validate(function(err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', function(done) {
    const member = new Member();

    member.validate(function(err) {
      expect(err.errors.passwordHash).to.exist;
      done();
    });
  });

  it('should have a function validatePassword', function(done) {
    const n = new Member({
      username: 'wilson',
      email: 'wilson@g.com',
      password: 'password',
      passwordConfirmation: 'password'
    });

    expect(n.validatePassword).to.be.a('function');
    done();
  });
});
