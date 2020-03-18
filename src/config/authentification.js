module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error", "First Log in");
            return res.redirect("/login");
        }
    },
    isNotAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            req.flash("success", "You are loged");
            return res.redirect("/contacts");
        }
    }
};
