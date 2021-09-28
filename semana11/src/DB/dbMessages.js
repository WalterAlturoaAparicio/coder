const config =  require('./configsqlite.js')
const knex = require('knex')(config)

module.exports = knex;