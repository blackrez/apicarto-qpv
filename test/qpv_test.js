var should = require('should'),
  assert = require('assert'),
  request = require('supertest')

describe('Test QPV', function() {
  var server;
  beforeEach(function() {
    server = require('../app');
  });
  afterEach(function() {
    server.close();
  });
  describe('bounding box controller', function() {
    it('should return all geometries when no bounding box is provided', function(done) {
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
  describe('intersection between geojson and qpv layer controller', function() {
    it('should return 500 when no geojson', function(done) {
      request(server)
        .post('/qpv/intersects')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.error.should.equal("no geojson provided");
          done();
        });
    });

    it('should return an error when geojson is incorrect', function(done) {
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "name": "Test",
        },
        "geometry": {
          "type": "Point",
          "coordinates": [1]
        }
      };
      request(server)
        .post('/qpv/intersects')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(geojsonFeature))
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.error.should.equal("invalid geojson or geometry")
          done();
        });
    });
    it('should return an array of json whith metadata of the intersecton geojson with a point and qpv', function(done) {
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "name": "Test Point in qpv",
        },
        "geometry": {
          "type": "Point",
          "coordinates": [3.055502, 50.627702]
        }
      };
      request(server)
        .post('/qpv/intersects')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(geojsonFeature))
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.not.eql([]);
          res.body[0].should.have.property('nom_qp');
          res.body[0].should.have.property('commune_qp');
          res.body[0].should.have.property('code_qp');
          done();
        });
    });
    it('should return an empty aray of json of the intersecton geojson with a point and qpv', function(done) {
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
          "name": "Test Point in qpv",
        },
        "geometry": {
          "type": "Point",
          "coordinates": [0, 0]
        }
      };
      request(server)
        .post('/qpv/intersects')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(geojsonFeature))
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.eql([]);
          done();
        });
    });
    it('should return an json whith metadata of the intersecton geojson with a polygon and qpv', function(done) {
      var geojsonFeature = require('./samples/poly_in_qpv.json');
      request(server)
        .post('/qpv/intersects')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(geojsonFeature))
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.not.eql([]);
          res.body[0].should.have.property('nom_qp');
          res.body[0].should.have.property('commune_qp');
          res.body[0].should.have.property('code_qp');
          done();
        });
    });
  });
});
