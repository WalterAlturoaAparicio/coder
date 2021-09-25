import knex from "../db.js";
// eslint-disable-next-line no-extra-semi
;(async function () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await knex.schema.hasTable('producto_carrito')

		/* ------------------------------- crear tabla ------------------------------ */
		if (exist) {
			await knex.schema.dropTable('producto_carrito')
		}
        await knex.schema.createTable('producto_carrito', (table) => {
            table.increments('id').primary().notNullable()
			table.integer('product_id').notNullable().references("id").inTable("productos").onDelete("CASCADE").onUpdate("CASCADE")
			table.integer('carrito_id').notNullable().references("id").inTable("carritos").onDelete("CASCADE").onUpdate("CASCADE")
        })

        console.log('Tabla producto_carrito creada')
	} catch (error) {
		console.log(error)
	} finally {
		knex.destroy()
	}
})()