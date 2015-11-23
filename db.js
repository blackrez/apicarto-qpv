var pgp = require('pg-promise')()

module.exports = pgp(process.env.PG_URI || 'postgres://docker:docker@172.18.0.2:5432/apicarto_zoneville');
