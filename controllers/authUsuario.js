const passport = require("passport");

const Usuario = require("../models/Usuario");
 

exports.autenticarUsuario = passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/inicio_sesion",
    badRequestMessage: "debes ingresar tu correo y contraseña",
    failureFlash: true,
});

exports.cerrarSesion =(req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect("/inicio_sesion");
    })
};

exports.usuarioAutenticado = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/inicio_sesion");
};

exports.usuarioAdmin = (req, res, next)=>{
    const usuario = res.locals.Usuario;
    if(usuario.nivelUsuario == "administrador"){
        console.log(usuario.nivelUsuario);
        return next();
    }

    return res.redirect("/");
};