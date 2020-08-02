exports.formularioInicio = (req, res, next)=>{
    res.render("inicio", { layout : "auth"});
};