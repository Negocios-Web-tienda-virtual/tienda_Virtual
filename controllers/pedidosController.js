// importar modelo Pedidos
const Pedidos = require("../models/Pedido");

exports.formularioIngresarPedido = (req, res, next) => {
    res.render("ingresando_Pedido", { layout: "auth" });
};

exports.crearProducto = async(req, res, next) => {
    const { name, price, quantity, description } = req.body;
    try {
        await Pedidos.create({
            name,
            price,
            quantity,
            description,
        });
    } catch (error) {
        res.render("inicio_sesion", { layout: "auth" });
    }
};