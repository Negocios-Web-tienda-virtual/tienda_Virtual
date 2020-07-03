// Importar modelos necesarios
const AdministradorVS = require("../models/administradorVS");
exports.homeVirtualStore = (req, res, next) => {
    res.render("crear_Administrador");
};


exports.crearCuentaAdmin = async(req, res, next) => {

    const { fullname, email, password } = req.body;

    try {
        await AdministradorVS.create({
            name,
            email,
            password,
            codeAccess,
        });
        res.redirect("inicio_sesion_admin");
    } catch (error) {
        res.render("registrarse_admin")

    };

};

exports.formularioIniciarSesionAdmin = (req, res, next) => {
    res.render("iniciar_sesion_admin", { layout: "auth" });
}