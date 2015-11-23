var express = require('express')
  , router = express.Router()
  , Qpv = require('../models/qpv.js')
  , geojson = require('../helpers/geojson.js')
  , isvalidgeo = require('../helpers/isvalidgeo')
  , turf = require('turf')

router.get('/layer', function(req, res) {
  if (req.query.bbox){
    var bbox = req.query.bbox.split(",");
    var geojsonbbox = turf.bboxPolygon(bbox);
    var isvalid = isvalidgeo(geojsonbbox);
  }
  if (isvalid || !req.bbox){
    var qpv = Qpv.getLayer(bbox);
    qpv.then( function (data){
      var featureCollection = geojson.rows_to_geojson(data, Qpv.properties);
      res.json(featureCollection);
    }).catch(function (err){
      console.error(err)
      res.status(500).send({error:'something bad happens'})
    })
  }
  else{
    res.status(500).send({error:'invalid GeoJSON'})
  }
})

router.post('/intersects', function(req, res) {

  var qpv = Qpv.intersects(req.query.geom);
  res.send();
})
module.exports = router
