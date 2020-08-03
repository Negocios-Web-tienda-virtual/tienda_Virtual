const Sequelize = require("sequelize");

const dataBase = require("../config/db");


const slug = require("slug");

const shortid = require("shortid");
const Producto = require("./Producto");

// Definimos el modelo
const Pedido = dataBase.define(
    "pedido",
    {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
        precio: {
            type: Sequelize.FLOAT,
        },
        descripcion : {
            type: Sequelize.STRING,
        },
        quantity : {
            type: Sequelize.INTEGER,
        },
        estado:{
            type: Sequelize.BOOLEAN,
        }
        ,
        fecha : {
            type: Sequelize.DATE,
        },
        url: {
            type:  Sequelize.STRING,
        },
        total:{
            type: Sequelize.FLOAT,
        },
        subtotal:{
            type: Sequelize.FLOAT,
        },
        impuesto:{
            type: Sequelize.FLOAT,
        },
    },
    {
        hooks : {
            beforeCreate(pedido){
                const url = slug(pedido.nombre).toLowerCase();
                const date = new Date();
                
                pedido.url = `${url}_${shortid.generate()}`;
                pedido.fecha = date.toISOString();
            },
            beforeUpdate(pedido){
                const url = slug(pedido.nombre).toLowerCase();
                
                pedido.url =`${url}_${shortid.generate()}`;
            },
        },
    }
);
Pedido.belongsTo(Producto);
module.exports = Pedido;