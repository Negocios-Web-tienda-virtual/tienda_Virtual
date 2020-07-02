const Sequelize = require("sequelize");

const dataBase = require("../config/db");

const shortid = require("shortid");

const slug = require("slug");

// Definimos el modelo
const Producto = dataBase.define(
    "producto",
    {
        idProducto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate :{
                notEmpty : {
                    msg : "Debes de ingresar el nombre del producto",
                },
            },
        },
        price :{
            type: Sequelize.FLOAT,
            allowNull: false,
            validate : {
                notEmpty :{
                    msg : "Debes de ingresar el precio del producto",
                },
            },
        },
        quantity:{
            type : Sequelize.INTEGER,
            allowNull: false,
            validate : {
                notEmpty :{
                    msg :"Debes de ingresar la cantidad",
                },
            },
        },
        description :{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                msg: "Ingresa la descripcion del producto",
            },
        },
        url : {
            type: Sequelize.STRING,
        },
        
    },
    {
        hooks: {
            beforeCreate(producto){
                const url = slug(producto.name).toLowerCase();

                producto.url = `${url}_${shortid.generate()}`;
            },
            beforeUpdate(producto){
                const url = slug(producto.name).toLowerCase();

                producto.url = `${url}_${shortid.generate()}`;
            }

        }
    }
);

module.exports = Producto;