import config from './configsqlite.js';
import knex from 'knex';
console.log("Conectado a la BD (Productos)");
export default knex(config);