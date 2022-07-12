import sequalize from "sequelize"

const connection = new sequalize({
    dialect: 'mysql',
    host: 'localost',
    database: 'lms',
    username: 'root',
    password: '',
})
export default connection;