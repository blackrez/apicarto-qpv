// GeoJSON Feature Collection
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}

exports.rows_to_geojson = function(rows, propertiesObject){
  var featureCollection = new FeatureCollection();

  for (var i = 0; i < rows.length; i++) {
    var properties = {};
    for (var p in propertiesObject){
        namePropertie = propertiesObject[p];
        properties[namePropertie] = rows[i][namePropertie];
    }
    featureCollection.features[i] = {
      type: "Feature",
      geometry: JSON.parse(rows[i].geom),
      properties: properties
    }
  }
  return featureCollection
}
