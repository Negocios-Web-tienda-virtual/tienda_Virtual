const Usuario = require("../models/Usuario");
exports.formularioMenu = (req, res, next) => {
    const usuario = res.locals.Usuario;
    console.log(usuario.nivelUsuario);
    res.render("menu", { layout: "auth", user: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false, userad: usuario.nivelUsuario == "administrador" ? true : false });
};
exports.formularionNosotros = (req, res, next) => {
    const usuario = res.locals.Usuario;
    res.render("nosotros", { layout: "auth", user: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false, userad: usuario.nivelUsuario == "administrador" ? true : false });
};