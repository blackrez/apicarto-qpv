var should = require('should'),
  assert = require('assert'),
  request = require('supertest')

describe('Routing', function() {
  var server;
  beforeEach(function () {
    server = require('../app');
  });
  afterEach(function () {
    server.close();
  });
  describe('bounding box controller', function() {
    it('should return all geometries when no bounding box is precised', function(done) {
      request(server)
        .get('/qpv/layer')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.type.should.equal("FeatureCollection");
          res.body.features.length.should.not.equal(0);
          res.body.features.should.not.equal(null);
          done();
        });
    });
    it('should return an error when bounding box is incorrect', function(done) {
      request(server)
        .get('/qpv/layer?bbox=bbox')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.error.should.equal("invalid bbox")
          done();
        });
    });
    it('should return an valid geojson when bounding box is correct', function(done) {
      request(server)
        .get('/qpv/layer?bbox=4.718971252441407,43.91458889820759,5.0435829162597665,43.98441605494321')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.type.should.equal("FeatureCollection");
          res.body.features.should.not.equal(null);
          done();
        });
    });
  });
});
