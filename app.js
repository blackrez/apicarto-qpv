var express = require('express'),
  cors = require('cors'),
  app = express(),
  winston = require('winston'),
  expressWinston = require('express-winston');

//if cors needs more configuration do it in middlewares
app.use(cors());


app.use(require('./controllers'));
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));


var server = app.listen(3000 || process.env.APP_PORT, function() {
  var port = server.address().port;
  console.log('Express app is listening at port %s', port);
})
module.exports = server;
