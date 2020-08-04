const Usuario = require("../models/Usuario");

exports.formularioUsuario = (req, res, next) => {
    res.render("registro", { layout: "auth" });
};

exports.crearUsuario = async(req, res, next) => {
    const { name, email, direccion, telefono, password, codeAccess, nivelUsuario } = req.body;
    const mensajes = [];

    try {
        if (nivelUsuario != null) {
            if ((nivelUsuario == "administrador") && (codeAccess == process.env.codeAccessPassword)) {
                await Usuario.create({
                    name,
                    email,
                    direccion,
                    telefono,
                    password,
                    codeAccess,
                    nivelUsuario,
                });
                res.redirect("/inicio_sesion");
                mensajes.push({
                    error: "Se inicio sesión satisfactoriamente.",
                    type: "alert-success",
                });
            } else if (nivelUsuario == "cliente") {
                await Usuario.create({
                    name,
                    email,
                    direccion,
                    telefono,
                    password,
                    codeAccess: 0,
                    nivelUsuario,
                });

                mensajes.push({
                    error: "Se inicio sesión satisfactoriamente.",
                    type: "alert-success",
                });
                res.redirect("/inicio_sesion");
            } else {
                res.redirect("/registro");
                mensajes.push({
                    error: "No se registro correctamente.",
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
        res.render("registro", { layout: "auth", error: error.message });
    }
};
exports.formularioIniciarSesion = (req, res, next) => {
    const messages = res.locals.messages;
    res.render("Inicio_sesion", { layout: "auth", messages });
};
exports.formularioReestablecerPassword = (req, res, next) => {
    res.render("restablecer_Password", { layout: "auth" });
};