// importar modelo Producto
const Productos = require("../models/Producto");
const Producto = require("../models/Producto");

exports.formularioIngresarProducto = (req, res, next) => {
    res.render("AgregarProducto", { layout: "auth" });
};

exports.crearProducto = async(req, res, next) => {
    const administrador = res.locals.Administrador;

    console.log(administrador, "1");

    const { name, price, quantity, description, image, } = req.body;
    try {

        await Productos.create({
            name,
            price,
            quantity,
            description,
            image,
            administradorId: administrador.id,
        });
        res.redirect("/ver_producto");
    } catch (error) {
        res.render("AgregarProducto", { layout: "auth" });
        console.log(error);

    }res.redirect("/ver_producto");
};


exports.mostrarProductos = async(req, res, next) => {
    const administrador = res.locals.Administrador;

    try {
        const productos = await Productos.findAll();
        res.render("AgregarProducto", { productos, layout: "auth" });


    } catch (error) {
        console.log(error);


    }
};
exports.mostrarProductosCliente = async(req, res, next) => {
    const administrador = res.locals.Administrador;

    try {
        const productos = await Productos.findAll();
        res.render("ver_productos", { productos, layout: "auth" });

    } catch (error) {
        console.log(error);


    }
};


exports.obtenerProductoPorUrl = async(req, res, next) => {

    const administrador = res.locals.Administrador;
    try {

        const producto = await Productos.findOne({
            where: {
                url: req.params.url,
            },
        });

        res.render("modificar_producto", {
            producto: producto.dataValues,
            layout: "auth"
        });
        console.log(producto);


    } catch (error) {
        console.log(error);

        res.redirect("agregarProducto");
    }
};

exports.actualizarProducto = async(req, res, next) => {

    const { name, price, quantity, description, image } = req.body;

    const administrador = res.locals.Administrador;
    const mensaje = [];
    if (!name) {
        mensaje.push({
            error: "Debes de ingresar el nombre del producto",
            type: "alert-danger",
        });
    }
    if (!price) {
        mensaje.push({
            error: "Debes de ingresar el precio del producto",
            type: "alert-danger",
        });
    }
    if (!description) {
        mensaje.push({
            error: "Debes de ingresar la descripcion del producto",
            type: "alert-danger",
        });
    }
    if (!image) {
        mensaje.push({
            error: "Debes de ingresar una imagen del producto",
            type: "alert-danger",
        });
    }
    console.log("proceso");

    if (mensaje.length) {

        const producto = await Productos.findByPk(req.params.id);

        res.render("modificar_producto", {
            producto: producto.dataValues,
            mensaje,


        });
    } else {
        await Producto.update({
            name,
            price,
            quantity,
            description,
            image,
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/ver_producto");
    }


};
exports.eliminar_producto = async(req, res, next) => {
    const { url } = req.query;

    try {
        await Producto.destroy({
            where: {
                url,
            },
        });

        res.status(200).send("Producto eliminado");
        
    } catch (error) {
        console.log(error);
        
        return next();
    }
    
};