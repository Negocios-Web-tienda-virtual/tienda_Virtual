const Cliente = require("../models/Cliente");

exports.formularioCrearCuenta = (req, res, next)=>{
res.render("registrarse", { layout : "auth"});
};

exports.crearCuenta = async (req, res, next) => {
    const {fullname, email, password, address, phoneNumber} = req.body;

    try {
        await Cliente.create({
            fullname,
            email,
            password,
            address,
            phoneNumber,
        });

        res.redirect("inicio_sesion");
    } catch (error) {
        res.render("registrarse", {layout: "auth", error});
    }

};

exports.formularioIniciarSesion = (req, res, next)=>{
    res.render("inicio_sesion", { layout : "auth"});
};
