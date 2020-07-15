// importar passport
const passport = require("passport");

// utilizar la estrategia local
const LocalStrategy = require("passport-local");

//importar la referencia al modelo que contiene los datos de autenticación 
const Cliente = require("../models/Cliente");
const Admin = require("../models/Administrador");

//definición de estrategia de autenticación
passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        async(email, password, done) => {
            try {
                const cliente = await Cliente.findOne({
                    where: { email },
                });

                if (!cliente.comparePassword(password)) {
                    return done(null, false, {
                        message: "Correo incorrecto",
                    });
                }
                return done(null, cliente);
            } catch (error) {
                return done(null, false, {
                    message: "La cuenta de correo electrónico no esta registrada."
                });
            }
        }
    )
);

// permitir que passport lea los valores del objeto cliente
passport.serializeUser((cliente, callback) => {
    callback(null, cliente);
});

//deserealizar el cliente
passport.deserializeUser((cliente, callback) => {
    callback(null, cliente);
});

module.exports = passport;