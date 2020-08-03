exports.formularioMenu = (req, res, next) => {
    res.render("menu", { layout: "auth" });
};
exports.formularionNosotros = (req, res, next) => {
    res.render("nosotros", { layout: "auth" });
};