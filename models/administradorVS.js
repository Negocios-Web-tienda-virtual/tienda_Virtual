// Importación de Sequelize
const Sequelize = require("sequelize");

const dataBase = require("../config/db");

const Pedido = require("./Pedido")

const bcrypt = require("bcrypt-nodejs");

const AdministradorVS = dataBase.define(
    "administradorVS",
    {
        idAdmin:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type : Sequelize.STRING(100),
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
            unique :{
                args: true,
                msg : "Ya existe un usuario registrado con este correo",
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
            type: Sequelize.STRING(100),
            allowNull: false,
            validate:{
                notEmpty: {
                    msg : "Debes de ingresar una contraseña",
                },
            },
        },
        codeAccess :{
            type: Sequelize.STRING(100),
            allowNull: false,
            validate :{
                notEmpty:
                { 
                    msg : "Debes de ingresar el codigo de acceso",
                },
            },
        },
    
        fecha : {
            type: Sequelize.DATE,
        },
        token : Sequelize.STRING,
        expiration: Sequelize.DATE,
    },
    { 
    hooks : {
        beforeCreate(administradorVS){
            administradorVS.password = bcrypt.hashSync(
                administradorVS.password,
                bcrypt.genSaltSync(13)
            );
        },
    },
},
);

AdministradorVS.hasMany(Pedido);

AdministradorVS.prototype.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = AdministradorVS;