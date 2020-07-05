// importando express router
const express = require("express");
const routes = express.Router();

// importar controlador del sitio web
const virtualStoreController = require("../controllers/virtualStoreController");
const usuarioController = require("../controllers/usuarioController");
const autenticar = require("../controllers/authClienteController");
const autenticarAdmin = require("../controllers/authAdminController");
const producto = require("../controllers/productosController");
const inicio = require("../controllers/inicioController"); /**/ 
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

    routes.get("/agregar_producto", producto.formularioIngresarProducto);
    routes.get("/",autenticarAdmin.autenticarAdmin)

    routes.get("/ver_producto",autenticarAdmin.adminAutenticado, producto.mostrarProductos);

    routes.post("/agregar_producto",autenticarAdmin.adminAutenticado,producto.crearProducto);

    routes.get("/modificar_producto/:url",autenticarAdmin.adminAutenticado,producto.obtenerProductoPorUrl);

    routes.post("/modificar_producto/:id",autenticarAdmin.adminAutenticado,producto.actualizarProducto);

    // Pagina inicial
    routes.get("/inicio", inicio.formularioInicio);



    return routes;
};