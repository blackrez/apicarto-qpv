var express = require('express'),
  router = express.Router(),
  Qpv = require('../models/qpv.js'),
  geojson = require('../helpers/geojson.js'),
  isvalidgeo = require('../helpers/isvalidgeo'),
  turf = require('turf')

router.get('/layer', function(req, res) {
  if (req.query.bbox) {
    var bbox = req.query.bbox.split(",");
    var geojsonbbox = turf.bboxPolygon(bbox);
    var isvalid = isvalidgeo(geojsonbbox);
  }
  if (isvalid || !req.query.bbox) {
    var qpv = Qpv.getLayer(bbox);
    qpv.then(function(data) {
      var featureCollection = geojson.rows_to_geojson(data, Qpv.properties);
      res.json(featureCollection);
    }).catch(function(err) {
      console.error(err)
      res.status(500).json({
        error: 'something bad happens'
      })
    })
  } else {
    res.status(500).json({
      error: 'invalid bbox'
    })
  }
})

router.post('/intersects', function(req, res) {
  var geojsonFeature = req.body;
  if (geojsonFeature.geometry){
    var isvalid = isvalidgeo(geojsonFeature);
  } else {
    res.status(500).json({
      error: 'no geojson provided'
    })
    // for fix this Error: Can't set headers after they are sent.
    return
  }
  if (isvalid){
    var qpv = Qpv.intersects(geojsonFeature.geometry);
    qpv.then(function (data){
      res.json(data);
    })
    .catch(function(err) {
      res.status(500).json({
        error: 'something bad happens'
      })
    })
  } else {
    res.status(500).json({
      error: 'invalid geojson or geometry'
    })
  }
})
module.exports = router
