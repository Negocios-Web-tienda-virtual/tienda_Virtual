// importar modelo Producto
const Productos = require("../models/Producto");
const Producto = require("../models/Producto");

exports.formularioIngresarProducto = (req, res, next) => {
    res.render("AgregarProducto", { layout: "auth" });
};

exports.crearProducto = async(req, res, next) => {
    const usuario = res.locals.Usuario;


    const { name, price, quantity, description} = req.body;
    const image = req.file.filename ;


    try {
        await Productos.create({
            name,
            price,
            quantity,
            description,
            image:image,
            usuarioId: usuario.id,
        });
        res.redirect("/ver_producto");
    } catch (error) {
        res.redirect("/ver_producto");
        console.log(error);

    }

};


exports.mostrarProductos = async(req, res, next) => {

    try {
        const productos = await Productos.findAll();
        res.render("AgregarProducto", { productos, layout: "auth" });


    } catch (error) {
        console.log(error);


    }
};
exports.mostrarProductosCliente = async(req, res, next) => {
    const usuario = res.locals.Usuario;
    console.log(usuario);
    try {
        const productos = await Productos.findAll();
        res.render("menu", {userad: usuario.nivelUsuario =="administrador" ? true: false, productos, user: usuario.nivelUsuario == "administrador" || usuario.nivelUsuario == "cliente" ? true : false, layout: "auth" });

    } catch (error) {
        console.log(error);


    }
};


exports.obtenerProductoPorUrl = async(req, res, next) => {

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

    const usuario = res.locals.Usuario;
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