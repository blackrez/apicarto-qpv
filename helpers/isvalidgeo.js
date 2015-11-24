//#TODO propose as turf module

/*@module validation
 * @category Helper
 * @param {Feature<>} poly1 the first polygon
 * @return {Boolean}
 * @example
 * var poly = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.801742, 45.48565],
 *     ]]
 *   }
 * }
 *
 * var isvald = geovalidator(poly);
 *
 */
module.exports = function(geom) {

  var reader = new jsts.io.GeoJSONReader();
  var g = reader.read(JSON.stringify(geom));

  return g.geometry.isValid()
};