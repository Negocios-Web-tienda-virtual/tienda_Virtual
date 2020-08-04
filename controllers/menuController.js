//Importar Modelo Usuario
const Usuario = require("../models/Usuario");

// FormularioMenu -> mostrara el menu con los productos disponibles
exports.formularioMenu = (req, res, next) => {
    const usuario = res.locals.Usuario;
    res.render("menu", { layout: "auth", user: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false, userad: usuario.nivelUsuario == "administrador" ? true : false });
};

// FormularionNosotros -> mostrara la vista de la información de la organización
exports.formularionNosotros = (req, res, next) => {
    const usuario = res.locals.Usuario;
    res.render("nosotros", { layout: "auth", user: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false, userad: usuario.nivelUsuario == "administrador" ? true : false });
};