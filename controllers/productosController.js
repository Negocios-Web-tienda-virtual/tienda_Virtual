// importar modelo Producto
const Productos = require("../models/Producto");

exports.formularioIngresarProducto = (req, res, next) => {
    res.render("agregarProducto", { layout: "auth" });
};

exports.crearProducto = async(req, res, next) => {
    const { name, price, quantity, description ,image} = req.body;
    try {
        console.log(name, price, quantity, description ,image);
        
        await Productos.create({
            name,
            price,
            quantity,
            description,
            image,
        });
        res.redirect("agregar_producto");
    } catch (error) {
        res.render("agregarProducto", { layout: "auth" });
        console.log(error);
        
    }
};

exports.mostrarProductos = async(req, res, next)=>{
    const administrador = res.locals.producto;
    console.log(productos,"aaaa");
    try {
        const productos = await Productos.findAll({
            where: {
                administradorId : administrador.idAdmin,
            }
        });
        res.render("agregar_producto", 
        {productos});
        console.log(productos);
        
    } catch (error) {
        console.log(error);
        
        
    }
}