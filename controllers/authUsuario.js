//Importar Passport
const passport = require("passport");
//Importar Modelo Usuario
const Usuario = require("../models/Usuario");
//Importar bcrypt-nodejs
const bcrypt = require("bcrypt-nodejs")
    //importar crypto
const crypto = require("crypto");
//importar la configuración de envio de correo electrónico
const enviarCorreo = require("../helpers/email");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    const resetUrl = `http://${req.headers.host}/resetear_password/${usuario.token}`;

    // Enviar el correo electrónico al usuario con el link que contiene
    // el token generado
    await enviarCorreo.enviarCorreo({
        usuario,
        subject: "Reestablece tu contraseña de usuario",
        resetUrl,
        vista: "email_restablecer",
        text: "Has solicitado reestablecer tu contraseña de Taskily! Autoriza el contenido HTML.",
    });

    // Redireccionar al usuario al inicio de sesión
    req.flash(
        "success",
        "Se envió un enlace para reestablecer tu contraseña a tu correo electrónico"
    );
    res.redirect("/inicio_sesion");
};
exports.validarToken = async(req, res, next) => {
    try {
        // Buscar si el token enviado existe
        const { token } = req.params;

        const usuario = await Usuario.findOne({
            where: {
                token,
            },
        });

        // Si no se encuentra el usuario
        if (!usuario) {
            req.flash("error", "¡El enlace que seguiste no es válido!");
            res.redirect("/restablecer_Password");
        }

        // Si el usuario existe, mostrar el formulario de generar nueva contraseña
        res.render("resetear_password", { layout: "auth", token });
    } catch (error) {
        res.redirect("/inicio_sesion");
    }
};
exports.actualizarPassword = async(req, res, next) => {
    const usuario = await Usuario.findOne({
        where: {
            token: req.params.token,
            expiration: {
                [Op.gte]: Date.now(),
            },
        },
    });

    // Verificar que se obtiene un usuario
    if (!usuario) {
        req.flash(
            "error",
            "Token no válido o vencida. El token tiene 1 hora de validez"
        );
        res.redirect("/restablecer_Password");
    }

    // Si el token es correcto y aún no vence
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    // Limpiar los valores del token y de la expiración
    usuario.token = null;
    usuario.expiration = null;

    // Guardar los cambios
    await usuario.save();

    // Redireccionar al inicio de sesión
    req.flash("success", "Tu contraseña se ha actualizado correctamente");
    res.redirect("/inicio_sesion");
};