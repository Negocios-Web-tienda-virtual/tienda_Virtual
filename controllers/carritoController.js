const Pedido = require("../models/Pedido");

exports.MostrarPedido = async(req, res, next) => {
    try {
        const carrito = await Pedido.findAll();
        res.render("carrito_Compras", { carrito, layout: "auth" });
    } catch (error) {
        console.log(error);
    }
}