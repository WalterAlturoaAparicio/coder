const config =  require('./configMysql.js')
const knex = require('knex')(config)

module.exports = knex;