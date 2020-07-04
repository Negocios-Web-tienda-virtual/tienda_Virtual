// importando express router
const express = require("express");
const routes = express.Router();

// importar controlador del sitio web
const virtualStoreController = require("../controllers/virtualStoreController");
const usuarioController = require("../controllers/usuarioController");
const autenticar = require("../controllers/authClienteController");
const autenticarAdmin = require("../controllers/authAdminController");
const producto = require("../controllers/productosController");
// construimos rutas disponibles para el servidor, estas deberán exportarse para poder
// ser utilizadas en los demás archivos
module.exports = function() {
    /*    routes.get("/", virtualStoreController.homeVirtualStore);*/

    routes.get("/",autenticarAdmin.adminAutenticado,virtualStoreController.home);

    routes.get("/registrarse", usuarioController.formularioCrearCuenta);

    routes.post("/registrate", usuarioController.crearCuenta);

    // Formulario para inicio de sesion del cliente
    routes.get("/inicio_sesion", usuarioController.formularioIniciarSesion);

    routes.post("/inicio_sesion",autenticar.autenticarCliente);

    //Formulario registrarse admin
    routes.get("/registrarse_administrador", virtualStoreController.formularioCrearCuenta);

    routes.post("/registrate_administrador", virtualStoreController.crearCuentaAdmin);

    // Formulario iniciar sesion admin
    routes.get("/inicio_sesion_admin", virtualStoreController.formularioIniciarSesionAdmin);

    routes.post("/inicio_sesion_admin", autenticarAdmin.autenticarAdmin);

    routes.get("/agregar_producto",autenticarAdmin.autenticarAdmin, producto.formularioIngresarProducto);

    routes.get("/agregar_producto",autenticarAdmin.autenticarAdmin, producto.mostrarProductos)

    routes.post("/agregar_producto",autenticarAdmin.autenticarAdmin, producto.crearProducto);

    return routes;
};