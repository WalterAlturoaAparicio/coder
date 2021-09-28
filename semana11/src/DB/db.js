import config from './configsqlite.js';
import knex from 'knex';
console.log("Conectado a la BD con exito!");
export default knex(config);