// Importamos los modulos
const Sequelize = require("sequelize");

const dataBase = require("../config/db");

const bcrypt = require("bcrypt-nodejs");

const Pedido = require("./Pedido");

const { Sequelize } = require("sequelize");

const Cliente = dataBase.define("cliente",
{
    idCustomer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: Sequelize.toString(100),
        allowNull: false,
        validate : {
            notEmpty: {
                msg: "Ingresa tu nombre completo"
            },
        },
    },
    email :{
        type: Sequelize.toString(100),
        allowNull: false,
        unique: {
            args: true,
            msg : "Ya existe un usuario registrador con este correo",
        },
        validate :{
            notEmpty: {
                msg : "Debes de ingresar un correo electronico",
            },
            isEmail : {
                msg : "verifica que tu correo es valido",
            },
        },
    },
    password : {
        type : Sequelize.toString(100),
        allowNull : false,
        validate : {
            notEmpty : {
                msg : "Debes de ingresar una contraseña",
            },
        },
    },
    address : {
        type : Sequelize.STRING(100),
        allowNull: false,
        validate : {
            msg : "Debes de ingresar tu direccion"
        },
    },
    phoneNumber : {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        validate : {
            msg : "Debes de ingresar tu numeró de telefono",
        },
    },
    token: Sequelize.STRING,
    expiration : Sequelize.DATE,
},
{
    hooks : {
        beforeCreate(cliente){
            cliente.password = bcrypt.hashSync(
                client.password,
                bcrypt.genSaltSync(13)
            );
        },
    },
},
);
Cliente.hasMany(Pedido);

Cliente.prototype.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = Cliente;