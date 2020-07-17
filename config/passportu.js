const passport = require("passport");


const LocalStrategy = require("passport-local");

const Usuario = require("../models/Usuario");

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
    async(email, password, done)=>{
        try {
            const usuario = await Usuario.findOne({
                where: { email },
            });

            if(!usuario.comparePassword(password)){
                console.log("error");
                return done(null, false,{
                    message: "Credenciales incorrectas",
                });
            }
            return done(null, usuario);
        } catch (error) {
            console.log(error);
            return done(null, false,{
                message: "La cuenta de correo electronico no esta registrada",
            });
            console.log("error 2");
        }
    }
    )
);

passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
});

passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
});

module.exports = passport;