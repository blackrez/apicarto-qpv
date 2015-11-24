var express = require('express'),
  cors = require('cors'),
  app = express(),
  winston = require('winston'),
  expressWinston = require('express-winston'),
  bodyParser = require('body-parser');

//if cors needs more configuration do it in middlewares
app.use(cors());

app.use(bodyParser.json());       // to support JSON-encoded bodies*

app.use(require('./controllers'));


var server = app.listen(3000 || process.env.APP_PORT, function() {
  var port = server.address().port;
  console.log('Express app is listening at port %s', port);
})
module.exports = server;
