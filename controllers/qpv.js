var express = require('express')
  , router = express.Router()
  , Qpv = require('../models/qpv.js')
  , geojson = require('../helpers/geojson.js')


router.get('/layer', function(req, res) {
  var qpv = Qpv.getLayer(req.query.bbox);
  qpv.then( function (data){
    var featureCollection = geojson.rows_to_geojson(data, Qpv.properties);
    res.json(featureCollection);
  }).catch(function (err){
    console.error(err)
    res.status(500).send({error:'something bad happens'})
  })
})

router.post('/intersects', function(req, res) {

  var qpv = Qpv.intersects(req.query.geom);
  res.send();
})
module.exports = router
