import { Sequelize } from 'sequelize';
import SetupModels from '../models/setupmodels';

const connection = new Sequelize({
	dialect: 'mysql',
	host: '127.0.0.1',
	database: 'lms',
	username: 'root',
	password: '',
	logging: false,
});
export { connection as default };
