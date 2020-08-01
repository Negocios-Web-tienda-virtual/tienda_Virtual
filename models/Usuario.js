const Sequelize = require("sequelize");

const bcrypt = require("bcrypt-nodejs");

const db = require("../config/db");

const Producto = require("./Producto")
const Pedido = require("./Pedido")

const Usuario = db.define(
    "usuario", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar el nombre del producto",
                },
            },
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un usuario registrado con este correo",
            },
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar un correo electronico",
                },
                isEmail: {
                    msg: "verifica que tu correo es valido",
                },
            },
        },
        direccion: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar una dirección",
                },
            },
        },
        telefono: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar un teléfono",
                },
            },
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar una contraseña",
                },
            },
        },
        codeAccess: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Debes de ingresar el codigo de acceso",
                },
            },
        },

        fecha: {
            type: Sequelize.DATE,
        },
        token: Sequelize.STRING,
        expiration: Sequelize.DATE,
        nivelUsuario: {
            type: Sequelize.STRING(100),
        }
    }, {
        hooks: {
            beforeCreate(usuario) {
                const date = new Date();
                usuario.fecha = date.toISOString();
                usuario.password = bcrypt.hashSync(
                    usuario.password,
                    bcrypt.genSaltSync(15)
                );
            },
        },
    },
);

Usuario.hasMany(Producto);
Usuario.hasMany(Pedido);

Usuario.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = Usuario;