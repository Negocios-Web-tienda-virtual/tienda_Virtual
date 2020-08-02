// importando express router
const express = require("express");
const routes = express.Router();
const { body } = require("express-validator");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
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
    const storage=multer.diskStorage({
        destination: path.join(__dirname, "../public/img/productos"),
        filename: (req, file, cb)=>{
            const extension = file.mimetype.split("/")[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    });
    const multerImage= multer({
        storage,
        dest: path.join(__dirname, '../public/img/productos')
    }).single('image');
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

    routes.post("/ver_producto", usuarioAu.usuarioAutenticado,multerImage, producto.crearProducto);


    routes.get("/modificar_producto/:url", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.obtenerProductoPorUrl);

    routes.post("/modificar_producto/:id", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, producto.actualizarProducto);
    routes.delete("/eliminar-producto/:url", producto.eliminar_producto);
    // Pagina inicial
    routes.get("/inicio", inicio.formularioInicio);

    // Nosotros
    routes.get("/nosotros", nosotros.formularionNosotros)

    // Menu
    routes.get("/menu", producto.mostrarProductosCliente);
    routes.get("/agregarPedido/:url", pedido.obtenerProductoPorUrl);

    routes.get("/agregar_pedido", usuarioAu.usuarioAutenticado, pedido.obtenerProductoPorUrl);

    routes.post("/agregar_pedido", usuarioAu.usuarioAutenticado, usuarioAu.usuarioCliente, pedido.crearPedido);

    routes.get("/Carrito", usuarioAu.usuarioAutenticado, carrito.mostrarProductos);
    // probando login nuevo
    routes.get("/login", usuario.formularioIniciarSesion);

    routes.patch("/Pedido/:id", usuarioAu.usuarioAutenticado, pedido.actualizarEstadoPedido);

    routes.get("/restablecerPassword",
        usuario.formularioReestablecerPassword);
    routes.post("/restablecerPassword",
        usuarioAu.enviarToken);


    routes.get("/resetear_password/:token",
        usuarioAu.validarToken);
    routes.post(
        "/resetear_password/:token",
        // Sanitizar el contenido del formulario
        body("password").notEmpty().trim(),
        usuarioAu.actualizarPassword
    );
    routes.get("/Pedidos", usuarioAu.usuarioAutenticado, usuarioAu.usuarioAdmin, pedido.mostrarPedido);
    routes.get("/cerrar_sesion", usuarioAu.cerrarSesion);

    routes.get("/pagar_creditCard", carrito.pagarcreditCard);
    return routes;
};