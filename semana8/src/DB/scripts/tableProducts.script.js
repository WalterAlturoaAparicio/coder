const knex = require('../dbProducts.js')
;(async function () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await knex.schema.hasTable('productos')

		/* ------------------------------- crear tabla ------------------------------ */
		if (exist) {
			await knex.schema.dropTable('productos')
		}
        await knex.schema.createTable('productos', (table) => {
            table.increments('id').primary().notNullable()
            table.string('title', 25).notNullable()
            table.float('price').notNullable()
            table.string('thumbnail', 255).notNullable()
            table.string('description', 100)
			table.string('date', 50)
            table.string('code', 25)
            table.integer('stock')
        })

        console.log('Tabla productos creada')
	} catch (error) {
		console.log(error)
	} finally {
		knex.destroy()
	}
})()