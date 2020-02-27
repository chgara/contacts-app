module.exports.flashMessage = function(parameter) {
    const succes = req.flash("succes", "All fine");
    const errorFlash = req.flash(
        "error",
        "The password or email are incorrects"
    );
    res.local.succesMessage = succes[0];
    res.local.errorMessage = errorFlash[0];
};
