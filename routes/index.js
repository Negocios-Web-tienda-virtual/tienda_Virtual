// importando express router
const express = require("express");
const routes = express.Router();

// importar controlador del sitio web
const pedido = require("../controllers/pedidosController");
const producto = require("../controllers/productosController");
const inicio = require("../controllers/inicioController"); /*ubicacion del controlador de inicio*/
const menu = require("../controllers/menuController"); /*ubicacion del controlador del menu*/
const usuario = require("../controllers/usuarioController");
const usuarioAu = require("../controllers/authUsuario");
const carrito = require("../controllers/carritoController");
// construimos rutas disponibles para el servidor, estas deberán exportarse para poder
// ser utilizadas en los demás archivos
module.exports = function() {
    /*    routes.get("/", virtualStoreController.homeVirtualStore);*/

    routes.get("/", inicio.formularioInicio);

    routes.get("/ver_productos", producto.mostrarProductosCliente)

    routes.get("/registro", usuario.formularioUsuario);

    routes.post("/registro", usuario.crearUsuario);

    // Formulario para inicio de sesion del cliente
    routes.get("/inicio_sesion", usuario.formularioIniciarSesion);

    routes.post("/inicio_sesion", usuarioAu.autenticarUsuario);



    routes.get("/agregar_producto", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.formularioIngresarProducto);
    //routes.get("/",autenticarAdmin.autenticarAdmin)

    routes.get("/ver_producto", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.mostrarProductos);

    routes.post("/ver_producto", usuarioAu.usuarioAutenticado, producto.crearProducto);


    routes.get("/modificar_producto/:url", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.obtenerProductoPorUrl);

    routes.post("/modificar_producto/:id", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.actualizarProducto);
    routes.delete("/eliminar-producto/:url", producto.eliminar_producto);
    // Pagina inicial
    routes.get("/inicio", inicio.formularioInicio);

    // Menu
    routes.get("/menu", menu.formularioMenu);

    routes.get("/agregar_pedido/:url", usuarioAu.usuarioAutenticado, pedido.obtenerProductoPorUrl);

    routes.post("/agregar_pedido/:url", usuarioAu.usuarioAutenticado, usuarioAu.usuarioCliente, pedido.crearPedido);



    routes.post("/carrito", carrito.MostrarPedido);

    return routes;
};