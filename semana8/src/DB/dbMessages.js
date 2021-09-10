 const config =  require('./configsqlite.js')
import knex from 'knex'

export const db = knex(config)

;(async function () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await db.schema.hasTable('mensajes')

		/* ------------------------------- crear tabla ------------------------------ */
		if (exist) {
			await db.schema.dropTable('mensajes')
		}
        await db.schema.createTable('mensajes', (table) => {
            table.increments('id').primary().notNullable()
            table.string('name', 50).notNullable()
            table.string('lastName', 60).notNullable()
            table.integer('identificacion').notNullable()
        })

        console.log('Tabla creada')
		// const user = await db.select().from('usuarios')
		// // 'select * from usuarios'
		// console.log(user)
	} catch (error) {
		console.log(error)
	} finally {
		db.destroy()
	}
})()