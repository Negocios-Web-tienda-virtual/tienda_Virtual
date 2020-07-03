// Importamos los modulos
const Sequelize = require("sequelize");

const dataBase = require("../config/db");

const bcrypt = require("bcrypt-nodejs");

const Pedido = require("./Pedido");



const Cliente = dataBase.define("cliente",
{
    idCustomer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname :{
        type: Sequelize.STRING(100),
        allowNull: false,
        validate : {
            notEmpty: {
                msg: "Ingresa tu nombre completo",
            },
        },
    },
    email :{
        type: Sequelize.STRING(100),
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
        type : Sequelize.STRING(100),
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
        
    },
    phoneNumber : {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
    token: Sequelize.STRING,
    expiration : Sequelize.DATE,
},
{
    hooks : {
        beforeCreate(cliente){
            cliente.password = bcrypt.hashSync(
                cliente.password,
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