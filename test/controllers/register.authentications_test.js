/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const Member = require('../../models/member');

describe('Register authentication testing', function() {

  beforeEach(done => {
    Member.collection.remove();
    done();
  });

  describe('POST /api/register', function() {

    it('should register a user with the correct credentials', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          name: 'test',
          email: 'test@t.com',
          username: 'test',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Thanks for registering.');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should not register a user without an email', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          // email: 'test',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Something went wrong.');
          done();
        });
    });
    it('should not register a user without a password', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com'
            // passwordConfirmation: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Something went wrong.');
          done();
        });
    });
    it('should not register a user with no password confirmation', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com',
            password: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(500);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Something went wrong.');
          done();
        });
    });
  });

});
