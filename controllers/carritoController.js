const Pedidos = require("../models/Pedido");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
moment.locale("es");

exports.pagarcreditCard = (req, res, next) => {
    res.render("formulariotarjeta", { layout: "auth" });
}
exports.formularioCarrito = (req, res, next) => {
    res.render("Carrito", { layout: "auth" });
};
exports.mostrarProductos = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    try {
        const totalsum = await Pedidos.sum('total', {
            where: {
                usuarioId: usuario.id,
                estadopago: {
                    [Op.eq]: 0
                }
            }
        });
        const subtotalsum = await Pedidos.sum('subtotal', {
            where: {
                usuarioId: usuario.id,
                estadopago: {
                    [Op.eq]: 0
                }
            }
        });
        const impuestosum = await Pedidos.sum('impuesto', {
            where: {
                usuarioId: usuario.id,
                estadopago: {
                    [Op.eq]: 0
                }
            }
        });
        Pedidos.findAll({
            where: {
                usuarioId: usuario.id,
            },
        }).then(function(pedidos) {
            pedidos = pedidos.map(function(pedido) {
                pedido.dataValues.fecha = moment(pedido.dataValues.fecha).fromNow();
                return pedido;
            });


            res.render("Carrito", { pedidos, layout: "auth", totalsum, subtotalsum, impuestosum });
        });

    } catch (error) {
        console.log(error);
    }
};