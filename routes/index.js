// importando express router
const express = require("express");
const routes = express.Router();

// importar controlador del sitio web
const virtualStoreController = require("../controllers/virtualStoreController");
const usuarioController = require("../controllers/usuarioController");

// construimos rutas disponibles para el servidor, estas deberán exportarse para poder
// ser utilizadas en los demás archivos
module.exports = function() {
    /*    routes.get("/", virtualStoreController.homeVirtualStore);*/

    routes.get("/registrarse", usuarioController.formularioCrearCuenta);

    routes.post("/registrate", usuarioController.crearCuenta);

   // Formulario para inicio de sesion del cliente
   routes.get("/inicio_sesion", usuarioController.formularioIniciarSesion);

   //Formulario registrarse admin
   routes.get("/registrarse_administrador", virtualStoreController.formularioCrearCuenta);

   routes.post("/registrate_administrador",virtualStoreController.crearCuentaAdmin);

   // Formulario iniciar sesion admin
   routes.get("/iniciar_sesion_admin", virtualStoreController.formularioIniciarSesionAdmin);

    return routes;
};