// importar passport
const passportAdmin = require("passport");

// utilizar la estrategia local
const LocalStrategy = require("passport-local");

//importar la referencia al modelo que contiene los datos de autenticación 
const Admin = require("../models/Administrador");

//definición de estrategia de autenticación
passportAdmin.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        async(email, password, done) => {
            try {
                const admin = await Admin.findOne({
                    where: { email },
                });

                if (!admin.comparePassword(password)) {
                    return done(null, false, {
                        message: "Correo incorrecto",
                    });
                }
                return done(null, admin);
            } catch (error) {
                return done(null, false, {
                    message: "La cuenta de correo electrónico no esta registrada."
                });
            }
        }
    )
);

// permitir que passport lea los valores del objeto admin
passportAdmin.serializeUser((admin, callback) => {
    callback(null, admin);
});

//deserealizar el admin
passportAdmin.deserializeUser((admin, callback) => {
    callback(null, admin);
});

module.exports = passportAdmin;