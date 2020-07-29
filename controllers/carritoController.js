const Pedidos = require("../models/Pedido");
const moment = require("moment");
moment.locale("es");

exports.formularioCarrito = (req, res, next) => {
    res.render("Carrito", { layout: "auth" });
};
exports.mostrarProductos = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    var valor=0;
    var sum=0;
    var subtotalantedepagar=0;
    var imp=0;
    var cantidadallevar=0;
    var totalporpedido=0;
    var total=[];
    var impuesto=[];
    var subtotal=[];
    try {
        Pedidos.findAll({
            where: {
                usuarioId: usuario.id,
            },
        }).then(function(pedidos) {
            pedidos = pedidos.map(function(pedido) {
                pedido.dataValues.fecha = moment(pedido.dataValues.fecha).fromNow();
                valor=pedido.dataValues.precio;
                cantidadallevar=pedido.dataValues.quantity;
                totalporpedido=valor*cantidadallevar;
                sum+=totalporpedido;
                return pedido;
            });

            imp=sum*0.15;
            subtotalantedepagar=sum-imp;
            total.push({tot: parseFloat(sum).toFixed(2)});
            impuesto.push({imp:parseFloat(imp).toFixed(2)});
            subtotal.push({sub: parseFloat(subtotalantedepagar).toFixed(2)});
            res.render("Carrito", {impuesto,subtotal, total ,pedidos, layout: "auth" });
        });

    } catch (error) {
        console.log(error);
    }
};
