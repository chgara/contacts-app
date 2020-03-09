const expres = require("express");
const router = new expres.Router();
const flash = require("connect-flash");
const { registerAuth, loginAuth } = require("../config/log-auth");

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
router.get("/options", (req, res, next) => {
    res.render("options");
});

//////////Getting the post routes//////////

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    loginAuth(req, res, email, password);
    res.redirect("/options");
});

router.post("/register", (req, res, next) => {
    const { username, email, password, password2 } = req.body;
    registerAuth(req, res, username, email, password, password2);
});

///////Data trans///////

module.exports = router;
