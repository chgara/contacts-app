const expres = require("express");
const router = new expres.Router();
const flash = require("connect-flash");
const colors = require("colors");
const { registerAuth, loginAuth, newContact } = require("../config/log-auth");
const passport = require("../config/passport");
const {
    isAuthenticated,
    isNotAuthenticated
} = require("../config/authentification");

//////////Getting main routes//////////

router.get("/", (req, res, next) => {
    res.render("index", { title: "Home" });
});
router.get("/home", (req, res, next) => {
    res.render("index", { title: "Home" });
});
router.get("/log", (req, res, next) => {
    res.render("log");
});
router.get("/login", isNotAuthenticated, (req, res, next) => {
    res.render("login");
});
router.get("/register", isNotAuthenticated, (req, res, next) => {
    res.render("register");
});
router.get("/contacts/add", isAuthenticated, (req, res, next) => {
    res.render("new-contact");
});
router.get("/options", isAuthenticated, async (req, res, next) => {
    res.render("options");
});
router.get("/contacts", isAuthenticated, (req, res, next) => {
    res.render("contacts", {
        title: "Contacts",
        number: 10
    });
});

//////////Getting the post routes//////////

router.post("/login", isNotAuthenticated, (req, res, next) => {
    const { useremail, password } = req.body;
    const success = loginAuth(req, res, useremail, password);
    if (success) {
        passport.authenticate("local.login", {
            successRedirect: "/options",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    }
});

router.post("/register", isNotAuthenticated, (req, res, next) => {
    const { username, useremail, password, password2 } = req.body;
    const success = registerAuth(
        req,
        res,
        username,
        useremail,
        password,
        password2
    );
    if (success) {
        passport.authenticate("local.register", {
            successRedirect: "/options",
            failureRedirect: "/register",
            failureFlash: true
        })(req, res, next);
    }
});

router.post("/contacts/add", isAuthenticated, (req, res, next) => {
    const { name, relation, number } = req.body;
    const success = newContact(req, res, name, relation, number);
    if (success) {
        req.flash("success", "Contact added successfully");
        res.redirect("/contacts");
    }
});

///////Data trans///////

module.exports = router;
