curl -O http://www.ville.gouv.fr/squelettes/carto/assets/qp-politiquedelaville-shp.zip
unzip -x qp-politiquedelaville-shp.zip
cd politiquedelaville-shp
 ogr2ogr -f 'geojson' qp_fixed.geojson QP_METROPOLEOUTREMER_WGS84_EPSG4326.shp
 ogr2ogr -lco GEOMETRY_NAME=geom -f PGDUMP qp.sql qp_fixed.geojson -nln quartiers_prioritaires
psql -f qp.sql -h postgis.docker -U docker apicarto_zoneville
