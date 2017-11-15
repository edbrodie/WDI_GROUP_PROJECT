/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const Member = require('../../models/member');

describe('Login authentication testing', function() {

  beforeEach(done => {
    Member.collection.remove();
    done();
  });

  describe('POST /api/login', function() {

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          name: 'testing',
          email: 'test@t.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end(() => {
          done();
        });
    });

    it('should login a user with the correct credentials', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@t.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome back.');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('should not login a user without an email', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized.');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
    it('should not login a user with the wrong password', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@t.com',
          password: '123123'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized.');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
  });

});
