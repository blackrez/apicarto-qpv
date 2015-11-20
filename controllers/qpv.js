var express = require('express')
  , router = express.Router()
  , Qpv = require('../models/qpv.js')
  , geojson = require('../helpers/geojson.js')


router.get('/layer', function(req, res) {
  var qpv = Qpv.getLayer(req.query.bbox, req, function (err, result){
    featureCollection = geojson.rows_to_geojson(result.rows, Qpv.properties)

    res.send(featureCollection);

  });
})

router.post('/intersects', function(req, res) {
  
  var qpv = Qpv.intersects(req.query, req, function (err, result){

    res.send(result.rows);

  });
})
module.exports = router
