/* globals api, expect, describe, beforeEach, afterEach, it */

require('../spec_helper');

const Event = require('../../models/event');
const Member = require('../../models/member');

xdescribe('Restful routes tests', () => {

  beforeEach(done => {
    Event.collection.remove();
    done();
  });

  afterEach(done => {
    Event.collection.remove();
    done();
  });

  describe('GET /api/events', () => {

    beforeEach(done => {
      Event.create({
        location: 'Brixton Acdemy',
        image: 'http://fillmuray.com/300/301',
        comments: {
          content: 'That was great'
        }
      })
        .then(() => done())
        .catch(done);
    });

    xit('should return a 200 response', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    xit('should respond with a JSON object', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    xit('should return an array of events', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of objects', done => {
      api.get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'location',
              'image',
              'comments'
            ]);
          done();
        });
    });

    xit('event objects should have properties: _id, name, image, createdAt, updatedAt', done => {
      api.get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const firstMember = res.body[0];

          expect(firstMember)
            .to.have.property('id')
            .and.to.be.a('string');

          expect(firstMember)
            .to.have.property('name')
            .and.to.be.a('string');

          expect(firstMember)
            .to.have.property('image')
            .and.to.be.a('string');

          expect(firstMember)
            .to.have.property('createdAt')
            .and.to.be.a('string');

          expect(firstMember)
            .to.have.property('updatedAt')
            .and.to.be.a('string');

          done();
        });
    });

  });
  xdescribe('POST /api/events', () => {

    xit('should return a 201 response', done => {
      api
        .post('/api/events')
        .set('Accept', 'application/json')
        .send({
          event: {
            name: 'Wilson Espina',
            image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
          }
        })
        .expect(201, done);
    });

    xit('should return a 200 response', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    xit('should return an array of events', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  xdescribe('GET /api/events/:id', () => {

    let event;

    beforeEach(done => {
      Event.create({
        name: 'wilson',
        image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
      })
        .then(eventData => {
          event = eventData;
          done();
        })
        .catch(done);
    });

    xit('should return a 200 response', done => {
      api
        .get(`/api/events/${event.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });
    xit('should respond with a JSON object', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    xit('should return an array of events', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  xdescribe('PUT /api/events/:id', () => {

    let event;

    beforeEach(done => {
      Event.create({
        name: 'wilson espina',
        image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
      })
        .then(eventData => {
          event = eventData;
          done();
        })
        .catch(done);
    });

    xit('should return a 200 response', done => {
      api
        .put(`/api/events/${event.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  xdescribe('PATCH /api/events/:id', () => {

    let event;

    beforeEach(done => {
      Event.create({
        name: 'wilson espina',
        image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
      })
        .then(eventData => {
          event = eventData;
          done();
        })
        .catch(done);
    });

    xit('should return a 200 response', done => {
      api
        .patch(`/api/events/${event.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });

  xdescribe('DELETE /api/events/:id', () => {

    let event;

    beforeEach(done => {
      Event.create({
        name: 'wilson espina',
        image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
      })
        .then(eventData => {
          event = eventData;
          done();
        })
        .catch(done);
    });

    xit('should return a 204 response', done => {
      api
        .delete(`/api/events/${event.id}`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });
  });
});
