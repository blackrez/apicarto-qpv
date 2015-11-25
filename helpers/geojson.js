// GeoJSON Feature Collection
function FeatureCollection() {
  this.type = 'FeatureCollection';
  this.features = new Array();
}

exports.rows_to_geojson = function(rows, propertiesObject) {
  var featureCollection = new FeatureCollection();
  rows.map(function (row){
    var properties = {};
    for (var p in propertiesObject) {
      namePropertie = propertiesObject[p];
      properties[namePropertie] = row[namePropertie];
    }
    featureCollection.features.push({
      type: "Feature",
      geometry: JSON.parse(row.geom),
      properties: properties
    })
  })
  return featureCollection
}
