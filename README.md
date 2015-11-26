## Synopsis (fr)


## Installation

### Installation application

#### Dépendances

 Node 5.0


```bash
$ npm install
```

ou vous pouvez l'installer avec docker

docker build -t apicarto/zoneville . < Dockerfile

### Création de la base de données


```bash
./load.sh
createdb zoneville
psql zoneville -c "create extension postgis"
psql -f qp.sql zoneville
```

### Launch it

```bash
$ cd ..
$ npm start
```
Or with docker

```bash
docker run --name zoneville -e PG_URI='postgres://docker:docker@postgis.docker/zoneville' apicarto/zoneville
```

## API Reference

Serveur publique :


### GET /qpv/layer

Paramètres

* bbox (optionnel) : bbox

-> retourne le geojson avec les qpv présents.

exemple : curl http://localhost:3000/qpv?bbox=4.718971252441407,43.91458889820759,5.0435829162597665,43.98441605494321


{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[4.83188055399615,43.9(...)}


### POST /qpv/intersects

Paramètres :

* geojson

exemple :

## Tests

```bash
$ cd ..
$ npm test
```

## ROADMAP


## Contributors

Nabil Servais

## License

MIT
