// importando express router
const express = require("express");
const routes = express.Router();

// importar controlador del sitio web
const virtualStoreController = require("../controllers/virtualStoreController");
const usuarioController = require("../controllers/usuarioController");

// construimos rutas disponibles para el servidor, estas deberán exportarse para poder
// ser utilizadas en los demás archivos
module.exports = function() {
    routes.get("/", virtualStoreController.homeVirtualStore);

    routes.get("/registrarse", usuarioController.formularioCrearCuenta);

    routes.get("/iniciar_sesion", usuarioController.formularioIniciarSesion);
    return routes;
};