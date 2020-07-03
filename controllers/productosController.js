// importar modelo Producto
const Productos = require("../models/Producto");

exports.formularioIngresarProducto = (req, res, next) => {
    res.render("ingresando_Productos", { layout: "auth" });
};

exports.crearProducto = async(req, res, next) => {
    const { name, price, quantity, description } = req.body;
    try {
        await Productos.create({
            name,
            price,
            quantity,
            description,
        });
        res.rendirec("ingresando_Productos", { layout: "auth" });
    } catch (error) {
        res.render("ingresando_Productos", { layout: "auth" });
    }
};