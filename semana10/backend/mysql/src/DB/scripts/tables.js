import knex from "../db.js";

// eslint-disable-next-line no-extra-semi
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
            table.string('title', 100).notNullable()
            table.string('price', 100).notNullable()
			table.string('thumbnail', 100).notNullable()
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

// eslint-disable-next-line no-extra-semi
;(async function () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await knex.schema.hasTable('carritos')

		/* ------------------------------- crear tabla ------------------------------ */
		if (exist) {
			await knex.schema.dropTable('carritos')
		}
        await knex.schema.createTable('carritos', (table) => {
            table.increments('id').primary().notNullable()
			table.string('date', 50)
        })

        console.log('Tabla carritos creada')
	} catch (error) {
		console.log(error)
	} finally {
		knex.destroy()
	}
})()

