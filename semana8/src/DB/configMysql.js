/* eslint-disable no-undef */
const dotenv = require('dotenv')
dotenv.config()

const config = {
	client: 'mysql',
	connection: {
		host: process.env.HOST,
		user: process.env.USERDB,
		password: process.env.PASSWORDDB,
		database: process.env.DATABASE,
	},
}

module.exports = config