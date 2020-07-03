// Importar passport
const passport = require("passport");

// Importar el modelo de Cliente
const Cliente = require("../models/Cliente");

// verificar si el cliente se puede autenticar con sus 
const Sequelize = require("sequelize");

// verificar si el cliente puede autenticar
exports.autenticarCliente = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/inicio_sesion",
    badRequestMessage: "debes ingresar tu correo y contraseña",
    failureFlash: true,
});

// cerrar la sesión del cliente actual
// una vez cerrada la sesión del cliente actual le enviamos la vista de iniciar sesión
exports.cerrarSesionCliente = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/inicio_sesion");
    })
};

//verificar si el cliente esta autenticado
exports.clienteAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    //si el cliente no esta autenticado, iniciar sesión
    return res.redirect("/inicio_sesion");
};