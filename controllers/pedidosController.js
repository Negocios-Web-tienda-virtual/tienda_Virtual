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
            producto: producto.dataValues,layout: "auth"
        });
    } catch (error) {
        res.redirect("/menu");
        console.log(error);
    }

};
exports.crearPedido = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    const { nombre, precio, quantity, descripcion } = req.body;
    var total= precio*quantity;

    try {
        await Pedido.create({
            nombre,
            precio,
            descripcion,
            quantity,
            estadopago:0,
            fecha: new Date().getTime(),
            usuarioId: usuario.id,
            total:total,
        });
        console.log(nombre);
        res.redirect("/menu");

    } catch (error) {
        res.redirect("/menu")
    }
};
exports.mostrarPedido = async(req, res, next) => {

    try {
        const pedidos = await Pedido.findAll();
        res.render("Pedidos", { pedidos, layout: "auth" });

    } catch (error) {
        console.log(error);


    }
};

exports.actualizarEstadoPedido = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const pedido= await Pedido.findOne({
            where:{
                id,
            },
        });

        const estadopago = pedido.estadopago = 0 ? 1 : 0;
        
        pedido.estadopago = estadopago;
        
        await pedido.save();

        res.status(200).send("El pago se acualizado correctamente");
    } catch (error) {
        res.send(401).send("Error al momento de actualizar el pago");
    }
}