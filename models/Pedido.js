const Sequelize = require("sequelize");

const dataBase = require("../config/db");


const slug = require("slug");

const shortid = require("shortid");

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
        estadopago:{
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
        }
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

module.exports = Pedido;