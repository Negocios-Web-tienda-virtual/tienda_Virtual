const passport = require("passport");

const Usuario = require("../models/Usuario");

//importar crypto
const crypto = require("crypto");
//importar la configuración de envio de correo electrónico
const enviarCoreo = require("../helpers/email");

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
    const mensajes = [];
    if (usuario.nivelUsuario == "administrador") {
        return next();
    }

    return res.redirect("/inicio_sesion");
    mensajes.push({
        error: "No estas autenticado, intenta nuevamente.",
        type: "alert-warning",
    });
};

exports.usuarioCliente = (req, res, next) => {
    const usuario = res.locals.Usuario;
    const mensajes = [];
    if (usuario.nivelUsuario == "cliente") {
        return next();
    } else {
        mensajes.push({
            error: "Debes registrarte para poder agregar pedidos",
            alert: "alert-warning",
        });
        res.redirect("/");
    }

};
exports.enviarToken = async(req, res, next) => {
    // Verificar si existe el usuario
    const { email } = req.body;
    const usuario = await Usuario.findOne({
        where: {
            email,
        },
    });

    // Si el usuario no existe
    if (!usuario) {
        req.flash("error", "¡Este usuario no está registrado!");
        res.redirect("/restablecerPassword");
    }

    // Si el usuario existe
    // Generar un token único con una fecha de expiración
    usuario.token = crypto.randomBytes(20).toString("hex");
    usuario.expiration = Date.now() + 3600000;

    // Guardar el token y la fecha de validez
    await usuario.save();

    // URL de reestablecer contraseña
    const resetUrl = `http://${req.headers.host}/reestablecerPassword/${usuario.token}`;

    // Enviar el correo electrónico al usuario con el link que contiene
    // el token generado
    await enviarCorreo.enviarCorreo({
        usuario,
        subject: "Reestablece tu contraseña de usuario",
        resetUrl,
        vista: "email_reestablecer",
        text: "Has solicitado reestablecer tu contraseña de Taskily! Autoriza el contenido HTML.",
    });

    // Redireccionar al usuario al inicio de sesión
    req.flash(
        "success",
        "Se envió un enlace para reestablecer tu contraseña a tu correo electrónico"
    );
    res.redirect("/iniciar_sesion");
};