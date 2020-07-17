const passport = require("passport");

const Usuario = require("../models/Usuario");


exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/inicio_sesion",
    badRequestMessage: "debes ingresar tu correo y contraseña",
    failureFlash: true,
});

exports.cerrarSesion = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/inicio_sesion");
    })
};

exports.usuarioAutenticado = (req, res, next) => {
    const mensajes = [];

    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/inicio_sesion");
    mensajes.push({
        error: "No estas autenticado, intenta nuevamente.",
        type: "alert-warning",
    });
};

exports.usuarioAdmin = (req, res, next) => {
    const usuario = res.locals.Usuario;
    if (usuario.nivelUsuario == "administrador") {
        return next();
    }

    return res.redirect("/inicio_sesion");
    mensajes.push({
        error: "No estas autenticado, intenta nuevamente.",
        type: "alert-warning",
    });
};

exports.usuarioCliente = (req, re, next)=>{
    const usuario = res.locals.Usuario;
    const mensajes = [];
    if(usuario.nivelUsuario == "cliente"){
    return next();
    }
    else{
        mensajes.push({
            error: "Debes registrarte para poder agregar pedidos",
            alert: "alert-warning",
        });
        res.redirect("/");
    }
    
};