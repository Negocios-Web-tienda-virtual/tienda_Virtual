//Importar modelo Producto
const Productos = require("../models/Producto");
//Importar modelo Pedido
const Pedido = require("../models/Pedido");
//Importar modelo Usuario
const Usuario = require("../models/Usuario");
//Importar Sequelize
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Mostrar vista ingresar pedido
exports.formularioIngresarPedido = (req, res, next) => {
    res.render("ingresando_Pedido", { layout: "auth" });
};


//Obtener los pedidos mediante la URL generada
exports.obtenerProductoPorUrl = async(req, res, next) => {
    try {
        const producto = await Productos.findOne({
            where: {
                url: req.params.url
            },
        });
        res.render("agregarPedido", {
            producto: producto.dataValues,
            layout: "auth"
        });
    } catch (error) {
        res.redirect("/menu");
        console.log(error);
    }

};

//Crear un pedido con los parametros definidos  a continuación
exports.crearPedido = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    const { nombre, precio, quantity, descripcion } = req.body;
    var total = precio * quantity;
    var impuesto = total * 0.15;
    var subtotal = total - impuesto;
    try {
        await Pedido.create({
            nombre,
            precio,
            descripcion,
            quantity,
            estado: 0,
            fecha: new Date().getTime(),
            usuarioId: usuario.id,
            total: total,
            impuesto: impuesto,
            subtotal: subtotal,
        });
        res.redirect("/menu");
    } catch (error) {
        res.redirect("/menu")
    }
};

// Mostrara todos los pedidos que contengan el nivel de usuario como Cliente
exports.mostrarPedido = async(req, res, next) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                nivelUsuario: "cliente",
            }
        });
        const pedidos = await Pedido.findAll();
        res.render("Pedidos", { usuarios, pedidos, layout: "auth" });
    } catch (error) {
        console.log(error);
    }
};

// Actualizara el estado del pedido en todo caso de estar pagado o no pagado -> el admin lo modifica una vez el 
// cliente realiza el pago
exports.actualizarEstadoPedido = async(req, res, next) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findOne({
            where: {
                id,
            },
        });
        const estado = pedido.estado == 0 ? 1 : 0;
        pedido.estado = estado;
        await pedido.save();
        res.status(200).send("El pago se acualizado correctamente");
    } catch (error) {
        res.send(401).send("Error al momento de actualizar el pago");
    }
};

// Eliminara un pedido 
exports.elimanrPedido = async(req, res, next) => {
    const { id } = req.params;

    try {
        await pedidos.destroy({
            where: {
                id,
            }
        });
        res.status(200).send({ message: "EL pedido ha sido elimando" });
    } catch (error) {
        res.status(401).send("Hubo un problema para elimnar el pedido");
    }
}