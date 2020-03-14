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
router.get("/login", (req, res, next) => {
    res.render("login");
});
router.get("/register", (req, res, next) => {
    res.render("register");
});
router.get("/contacts/add", (req, res, next) => {
    res.render("new-contact");
});
router.get("/options", async (req, res, next) => {
    res.render("options");
});
router.get("/contacts", (req, res, next) => {
    res.render("contacts", {
        title: "Contacts",
        number: 10
    });
});

//////////Getting the post routes//////////

router.post("/login", (req, res, next) => {
    const { useremail, password } = req.body;
    const success = loginAuth(req, res, useremail, password);
    if (success) {
        passport.authenticate("local.login", {
            successRedirect: "/contacts",
            failureRedirect: "/contacts",
            failureFlash: true
        });
    }
});

router.post("/register", (req, res, next) => {
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
            successRedirect: "/contacts",
            failureRedirect: "/contacts",
            failureFlash: true
        });
    }
});

router.post("/contacts/add", (req, res, next) => {
    const { name, relation, number } = req.body;
    const success = newContact(req, res, name, relation, number);
    if (success) {
        req.flash("success", "Contact added successfully");
        res.redirect("/contacts");
    }
});

///////Data trans///////

module.exports = router;
