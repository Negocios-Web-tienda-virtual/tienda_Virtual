const Usuario = require("../models/Usuario");

exports.formularioUsuario = (req, res, next) => {
    res.render("registro", { layout: "auth" });
};

exports.crearUsuario = async(req, res, next) => {
    const { name, email, password, codeAccess, nivelUsuario } = req.body;
    const mensaje =
        console.log(name, email, password, codeAccess, nivelUsuario);
    try {
        if (nivelUsuario != null) {
            if (nivelUsuario == "administrador" && codeAccess == "L3zr#R") {
                await Usuario.create({
                    name,
                    email,
                    password,
                    codeAccess,
                    nivelUsuario,
                });
                res.redirect("/inicio_sesion");
                mensajes.push({
                    error: "Se inicio sesión satisfactoriamente.",
                    type: "alert-success",
                });
            } else {
                mensajes.push({
                    error: "Ha ocurrido un error al registrarte!. Intenta de nuevo.",
                    type: "alert-danger",
                });
                res.redirect("/registro");
            }
            if (nivelUsuario == "cliente") {
                await Usuario.create({
                    name,
                    email,
                    password,
                    codeAccess,
                    nivelUsuario,
                });
                res.redirect("/inicio_sesion");
                mensajes.push({
                    error: "Se inicio sesión satisfactoriamente.",
                    type: "alert-success",
                });
            }
        } else {
            mensajes.push({
                error: "Ha ocurrido un error al registrarte!. Intenta de nuevo.",
                type: "alert-danger",
            });
        }
    } catch (error) {
        mensajes.push({
            error: "Ha ocurrido un error interno en el servidor. Comunicate con el personal de la Tienda Virtual.",
            type: "alert-warning",
        });
    }
};
exports.formularioIniciarSesion = (req, res, next) => {
    res.render("inicio_sesion", { layout: "auth", mensajes });
};