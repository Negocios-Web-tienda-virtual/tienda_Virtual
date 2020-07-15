// importar modelo Pedidos
const Pedidos = require("../models/Pedido");
const Productos = require("../models/Producto");
const Pedido = require("../models/Pedido");

exports.formularioIngresarPedido = (req, res, next) => {
    res.render("ingresando_Pedido", { layout: "auth" });
};
exports.obtenerProductoPorUrl = async(req, res, next)=>{
    const cliente = res.locals.Cliente;

    try {
        const producto = await Productos.findOne({
            where:{ 
                url : req.params.url
            }, 
        
        });
        
                res.render("agregarPedido", {
                    producto: producto.dataValues,
                });
                console.log(producto.dataValues.id);
                
                
    
    } catch (error) {
        res.render("agregarPedido");
    }
  
};
exports.crearPedido = async(req, res, next) => {
   const { nombre, precio, quantity, descripcion } = req.body;
    const cliente = res.locals.Cliente;
    const producto = res.locals.Producto;
    console.log(nombre,precio,quantity,descripcion);
 
    console.log(cliente.id);
    
    
    try {
        if(cliente.id){
            await Pedido.create({
                nombre,
                precio,
                descripcion,    
                quantity,
                clienteId: cliente.id,
            });
            res.redirect("/")
        }
        else{
            res.render("registrarse", {layout: "auth"});
        }
    } catch (error) {
        console.log(error);
        const productos = await Productos.findAll();
            res.render("ver_productos",
            {productos} );

    }
};