/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');
const Member = require('../../models/member');

describe('Authentication testing', function() {

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
          member: {
            name: 'test',
            email: 'test@t.com',
            username: 'test',
            password: 'password',
            passwordConfirmation: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Thanks for registering.');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    xit('should not register a user without an email', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            email: 'test',
            password: 'password',
            passwordConfirmation: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: email: Path `email` is required.');
          expect(res.body.message).to.eq('Bad Request');
          done();
        });
    });
    xit('should not register a user without a password', function(done) {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com',
            passwordConfirmation: 'password'
          }
        })
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: password: required');
          expect(res.body.message).to.eq('Bad Request');
          done();
        });
    });
    xit('should not register a user with no password confirmation', function(done) {
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
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.eq('ValidationError: passwordConfirmation: does not match');
          expect(res.body.message).to.eq('Bad Request');
          done();
        });
    });
  });

  xdescribe('POST /api/login', function() {

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: 'test',
            email: 'test@t.com',
            password: 'password',
            passwordConfirmation: 'password'
          }
        })
        .end(() => {
          done();
        });
    });

    xit('should login a user with the correct credentials', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@t.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Welcome back!');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    xit('should not login a user without an email', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Invalid credentials.');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
    xit('should not login a user with the wrong password', function(done) {
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
          expect(res.body.message).to.eq('Invalid credentials.');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
  });

});
