var db = require('../db')

exports.properties = ['code_qp',
                      'nom_qp',
                      'commune_qp']
/**
* Return all qpvp present in the bounding box
* @param {Array} bbox
*/

exports.getLayer = function(bbox){
  var sql = `SELECT ST_ASgeojson(qp.geom) as geom,
                      code_qp,
                      nom_qp,
                      commune_qp FROM politiqueville as qp`;
                      if (bbox){
                        sql +=  `,(select st_makeenvelope(${bbox.map(corner => corner)}, 4326) geom) b
                        where b.geom ~ qp.geom`
                      }
                      return db.query(sql);
}
exports.intersects = function(geom, req, cb){
  var sql = `SELECT code_qp,
                      nom_qp,
                      commune_qp FROM politiqueville as qp`;
  sql +=  `,(ST_SetSRID(ST_GeomFromGeoJSON(${geom}), 4326) d
  where st_intersects(d.geom, qp.geom)`
  db.query(sql);
}
/*
direct geojson from postgis, this is 20% slower than
var _ = require('lodash');

var geojsonsql_template = function (subquery){ return `
SELECT to_json(featureccollection) as geojson
    FROM ( SELECT 'FeatureCollection' As type, array_agg(feature) As features
    FROM (${subquery}) As feature )  As featureccollection;`};



exports.bbox = function(bbox ,req , cb) {
  if (bbox = []) {
    bbox = `
        SELECT 'Feature' As type,
          ST_AsGeoJSON(geom)::json As geometry,
          code_qp, nom_qp, commune_qp
          FROM politiqueville As qp`;
    sql = geojsonsql_template(bbox);
  } else {
    var bbox_query = _.template(`
      SELECT 'Feature' As type,
          ST_AsGeoJSON(geom)::json As geometry,
          row_to_json((code_qp, nom_qp, commune_qp)) As properties
          FROM politiqueville As q,
          (select st_makeenvelope(<% _.forEach(bbox, function(corner) { %><%- corner %>,<% });%> 4326) geom) d `);
  }
  var qpv;
  console.log(sql);
  req.pg.client.query(sql, cb);

}
*/
