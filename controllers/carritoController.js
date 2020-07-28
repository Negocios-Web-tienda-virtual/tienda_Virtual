const Pedidos = require("../models/Pedido");
const moment = require("moment");
moment.locale("es");

exports.formularioCarrito = (req, res, next) => {
    res.render("Carrito", { layout: "auth" });
};
exports.mostrarProductos = async(req, res, next) => {
    const usuario= res.locals.Usuario;
    try {
        Pedidos.findAll({
            where: {
                usuarioId: usuario.id,
            },
        }).then(function(pedidos){
            pedidos = pedidos.map(function(pedido){
                pedido.dataValues.fecha = moment(pedido.dataValues.fecha).fromNow();
                return pedido;
            });
            res.render("Carrito", { pedidos, layout: "auth"});
        });
    } catch (error) {
        console.log(error);
    }
};