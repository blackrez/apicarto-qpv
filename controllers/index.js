var express = require('express'),
  router = express.Router()

router.use('/qpv', require('./qpv'))

module.exports = router