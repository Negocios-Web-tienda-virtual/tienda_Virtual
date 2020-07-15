const Usuario = require("../models/Usuario");

exports.formularioUsuario = (req, res, next)=>{
    res.render("registro", { layout : "auth"});
};

exports.crearUsuario= async(req, res, next)=>{
    const {name, email, password, codeAccess, nivelUsuario}= req.body;
    const mensaje =
console.log(name, email, password, codeAccess, nivelUsuario);
    try {
        if (nivelUsuario!=null) {
            if (nivelUsuario=="administrador" && codeAccess=="L3zr#R") {
                await Usuario.create({
                    name,
                    email,
                    password,
                    codeAccess,
                    nivelUsuario,
                });
                res.redirect("/inicio_sesion");
            } else {
                console.log("Lo sentimos no puedes registrate");
                
                res.redirect("/registro");
            }
            if(nivelUsuario=="cliente"){
                await Usuario.create({
                    name,
                    email,
                    password,
                    codeAccess,
                    nivelUsuario,
                });
                res.redirect("/inicio_sesion");
            }
        } else {
            mensaje.push("!Debes de ingresar un tipo de usuario")
        }
    } catch (error) {
        console.log(error);
    }
};exports.formularioIniciarSesion = (req, res, next) => {
    res.render("inicio_sesion", { layout: "auth" });
};