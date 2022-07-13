import { readdir } from 'fs';
import { promisify } from 'util';
export default async (connection) => {
	const readdirAsync = promisify(readdir);
	const models = await readdirAsync('./models');
	for (let file of models) {
		if (file == 'setupmodels.js') continue;
		const { init } = await import(`./${file}`);
		init(connection);
	}
	for (let file of models) {
		if (file == 'setupmodels.js') continue;
		const { associate } = await import(`./${file}`);
		if (associate) {
			associate(connection.models);
		}
	}
};
