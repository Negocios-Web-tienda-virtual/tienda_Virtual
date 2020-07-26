const Productos = require("../models/Producto");

exports.formularioCarrito = (req, res, next) => {
    res.render("Carrito", { layout: "auth" });
};
exports.mostrarProductos = async(req, res, next) => {

    try {
        const productos = await Productos.findAll();
        res.render("Carrito", { productos, layout: "auth" });


    } catch (error) {
        console.log(error);


    }
};