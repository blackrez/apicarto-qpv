var pg = require('pg');
var onFinished = require('on-finished');

module.exports = function(req, res, next) {
    pg.connect(process.env.PG_URI || 'postgres://docker:docker@postgis.docker/apicarto_zoneville', function (err, client, done) {
            if (err) {
                console.log(err);
                //Return an error?
                return;
            }
        req.pg = {
             client: client,
             done: done,
             kill: false
         };
        next();
    });
    onFinished(req, function (err, req) {
      if (req.pg)
            req.pg.done();
    });
}
