// importar modelo Pedidos
const Pedidos = require("../models/Pedido");
const Productos = require("../models/Producto");
const Pedido = require("../models/Pedido");

exports.formularioIngresarPedido = (req, res, next) => {
    res.render("ingresando_Pedido", { layout: "auth" });
};
exports.obtenerProductoPorUrl = async(req, res, next) => {
    try {
        const producto = await Productos.findOne({
            where: {
                url: req.params.url
            },

        });
        res.render("agregarPedido", {
            producto: producto.dataValues,
        });
        console.log(producto.dataValues.id, "hasta aqui");



    } catch (error) {
        res.render("agregarPedido");
        console.log(error);
    }

};
exports.crearPedido = async(req, res, next) => {
    const { nombre, precio, quantity, descripcion } = req.body;
    const usuario = res.locals.Usuario;
    console.log(nombre, precio, quantity, descripcion, "prod");
    console.log(cliente.id, "vh");
    try {
        await Pedido.create({
            nombre,
            precio,
            descripcion,
            quantity,
            usuarioId: usuario.id,
        });
        res.redirect("/");
        console.log("222");

    } catch (error) {
        console.log(error);
        const productos = await Productos.findAll();
        res.render("ver_productos", { productos });
        console.log(error);

    }
};
exports.mostrarPedido = async(req, res, next) => {

    try {
        const pedidos = await Pedido.findAll();
        res.render("Carrito", { pedidos, layout: "auth" });

    } catch (error) {
        console.log(error);


    }
};