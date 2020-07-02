// Importar el sequelize para Nodejs que nos permite manipular bases de datos
const Sequelize = require("sequelize");
require("dotenv").config({ path: "variables.env" });
// Definición de parámetros de la base de datos de la VirtualStore
const dataBase = new Sequelize("virtualStore",
    process.env.MYSQLUSER,
    process.env.MYSQLPASS, {
        host: "localhost",
        dialect: "mysql",
        port: process.env.MYSQLPORT,
        operatorAlianses: false,
        define: {
            timestamps: false,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
module.exports = dataBase;