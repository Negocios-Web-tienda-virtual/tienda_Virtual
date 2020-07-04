// Importar modelos necesarios
const AdministradorVS = require("../models/AdministradorVS");

exports.home= (req, res, next)=> {
    res.render("agregarProducto");
};

exports.formularioCrearCuenta= (req, res, next) => {
    res.render("registrarse_administrador" ,{layout : "auth"});
};


exports.crearCuentaAdmin = async (req, res, next) => {
    const { fullname, email, password, codeAccess } = req.body;

    if(codeAccess == process.env.codeAccesPassword){
        console.log(process.env.codeAccesPassword);
        
    try {
        await AdministradorVS.create({
            fullname,
            email,
            password,
            codeAccess,
        });
        res.redirect("inicio_sesion_admin");
    } catch (error) {
        res.render("registrarse_administrador",{layout : "auth"});
        console.log(error);
        
    }
}
else{
    res.render("registrarse_administrador" ,{layout : "auth"});
}
};

exports.formularioIniciarSesionAdmin = (req, res, next) => {
    res.render("inicio_sesion_admin", { layout: "auth" });
}