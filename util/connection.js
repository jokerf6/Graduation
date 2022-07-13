import { Sequelize } from 'sequelize';

const connection = new Sequelize({
	dialect: 'mysql',
	host: 'localhost',
	database: 'lms',
	username: 'root',
	password: '',
	logging: false,
});
export { connection as default };
