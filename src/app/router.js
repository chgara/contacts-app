const expres = require("express");
const router = new expres.Router();
const flash = require("connect-flash");
const { registerAuth, loginAuth, newContact } = require("../config/log-auth");
const passport = require("../config/passport");

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
router.get("/login", (req, res, next) => {
    res.render("login", { error: req.flash("error") });
});
router.get("/register", (req, res, next) => {
    res.render("register", { error: req.flash("error") });
});
router.get("/contacts", (req, res, next) => {
    res.render("contacts");
});
router.get("/contacts/new-contact", (req, res, next) => {
    res.render("new-contact");
});
router.get("/options", (req, res, next) => {
    res.render("options");
});

//////////Getting the post routes//////////

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    const success = loginAuth(req, res, email, password);
    if (success) {
        res.redirect("/options");
    }
});

router.post("/register", (req, res, next) => {
    const { username, email, password, password2 } = req.body;
    const success = registerAuth(
        req,
        res,
        username,
        email,
        password,
        password2
    );
    if (success) {
        res.redirect("/options");
    }
});

router.post("/contacts/new-contact", (req, res, next) => {
    const { name, relation, number } = req.body;
    const success = newContact(req, res, name, relation, number);
    if (success) {
        res.redirect("/options");
    }
});

///////Data trans///////

module.exports = router;
