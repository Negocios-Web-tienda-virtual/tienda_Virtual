//Importar el nodemailer
const nodemailer = require("nodemailer");
// Importar la configuración de Mailtrap.io
const mailTrapConfig = require("../config/emails");
// Importar Handlebars
const hbs = require("handlebars");
//Importar el fs
const fs = require("fs");
//Importar el path
const path = require("path");

// Realizar el envío del correo electrónico mediante nodemailer
// hacia Mailtrap
// https://nodemailer.com/about/
exports.enviarCorreo = async(opciones) => {
    // Crear nuestro transportador SMTP reutilizable
    const transporter = nodemailer.createTransport({
        //parametros de configuracion de Mailtrap
        host: mailTrapConfig.host,
        port: mailTrapConfig.port,
        secure: false,
        auth: {
            user: mailTrapConfig.user,
            pass: mailTrapConfig.pass,
        },
    });

    // Obtener y construir el template del correo electrónico
    fs.readFile(
        path.resolve(__dirname, "../views/emails/email_restablecer.hbs"),
        "utf8",
        async function(error, source) {
            if (error) {
                throw error;
            }

            const data = {
                fullname: opciones.usuario.fullname,
                resetUrl: opciones.resetUrl,
            };

            const template = hbs.compile(source.toString());
            const html = template(data);

            const send = await transporter.sendMail({
                from: "Golosinas <willminpoldou@Golosinas.com>",
                to: opciones.usuario.email,
                subject: opciones.subject,
                text: opciones.text,
                html,
            });
        }
    );
};