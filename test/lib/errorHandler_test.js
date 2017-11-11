/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');

const errorHandler = require('../../lib/errorHandler');

describe('ErrorHandler', function() {
  it('should be defined', (done) => {
    expect(errorHandler).to.be.a('function');
    done();
  });



  
});
