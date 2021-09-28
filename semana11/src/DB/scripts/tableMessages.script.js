const knex = require('../dbMessages.js')
;(async function () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await knex.schema.hasTable('mensajes')

		/* ------------------------------- crear tabla ------------------------------ */
		if (exist) {
			await knex.schema.dropTable('mensajes')
		}
        await knex.schema.createTable('mensajes', (table) => {
            table.increments('id').primary().notNullable()
            table.string('email', 100).notNullable()
            table.string('message', 100).notNullable()
			table.string('date', 100).notNullable()
        })

        console.log('Tabla mensajes creada')
	} catch (error) {
		console.log(error)
	} finally {
		knex.destroy()
	}
})()