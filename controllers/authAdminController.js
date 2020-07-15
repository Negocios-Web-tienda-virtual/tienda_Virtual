// Importar passport
const passport = require("passport");

// Importar el modelo de administrador
const admin = require("../models/Administrador");

// verificar si el administrador se puede autenticar con sus 
const Sequelize = require("sequelize");

// verificar si el administrador puede autenticar
exports.autenticarAdmin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/inicio_sesion_admin",
    badRequestMessage: "Debes ingresar tu correo, contraseña y token",
    failureFlash: true,
});

// cerrar la sesión del administrador actual
// una vez cerrada la sesión del administrador actual le enviamos la vista de iniciar sesión
exports.cerrarSesionAdmin = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/inicio_sesion_admin");
    })
};

//verificar si el administrador esta autenticado
exports.adminAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    //si el administrador no esta autenticado, iniciar sesión
    return res.redirect("/inicio_sesion_admin");
};