const usuario = require("../models/Usuario");
exports.formularioInicio = (req, res, next) => {
    const usuario = res.locals.Usuario;
    res.render("inicio", { layout: "auth", userLog: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false });
};