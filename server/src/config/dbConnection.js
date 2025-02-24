import Sequelize from "sequelize";
const sequelize = new Sequelize('SwapSmart', 'root', 'Nasir@103', {
    host: 'localhost',
    dialect: 'mysql'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { dbConnection, sequelize };
