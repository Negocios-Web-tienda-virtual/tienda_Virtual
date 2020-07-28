const Pedidos = require("../models/Pedido");
const moment = require("moment");
moment.locale("es");

exports.formularioCarrito = (req, res, next) => {
    res.render("Carrito", { layout: "auth" });
};
exports.mostrarProductos = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    try {
        Pedidos.findAll({
            where: {
                usuarioId: usuario.id,
            },
        }).then(function(pedidos) {
            pedidos = pedidos.map(function(pedido) {
                pedido.dataValues.fecha = moment(pedido.dataValues.fecha).fromNow();
                console.log(pedido.dataValues.precio);
                const totales = calculartotales(pedido.dataValues.precio);
                return pedido;
            });
            res.render("Carrito", { pedidos, layout: "auth" });
        });

    } catch (error) {
        console.log(error);
    }
};

const calculartotales = (price) => {
    let totales = [];
    let precio = price;
    let subtot = 0;
    let subtot1 = 0
    let imp = 0;
    let tot = 0;
    subtot1 = subtot1 + precio;
    imp = subtot1 * 0.15;
    subtot = subtot1 - imp;
    tot = subtot + imp;

    totales.push({
        subtot,
        imp,
        tot,
    });
    console.log(totales);
    return totales;
};