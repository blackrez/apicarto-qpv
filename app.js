var express = require('express')
  , cors = require('cors')
  , app = express()

//if cors needs more configuration do it in middlewares
app.use(cors());
app.use(require('./controllers'));

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
