const expres = require("express");
const router = new expres.Router();
const user = require("./models/user");
const flash = require("connect-flash");
const flashMessages = require("../config/flash");
const User = new user();

/////Midlewares///////

router.use(function(req, res, next) {
    res.locals.message = req.flash("error");
    next();
});

//////////GETTING THE MAIN HOME PAGE////////
router.get("/", (req, res, next) => {
    res.render("index", { title: "Home" });
});
router.get("/home", (req, res, next) => {
    res.render("index", { title: "Home" });
});

/////////GETTINGE DE LOG OPTIONS PAGE/////////

router.get("/log", (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.redirect("/profile");
        return;
    }
    res.render("log");
});

/////////GETTING THE LOGIN PAGE//////////

router.get("/login", (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.redirect("/profile");
        return;
    }
    res.render("login");
    console.log(res.locals.message);
});
//////////IF USER SUBMIT LOGIN//////////

router.post("/login", (req, res, next) => {
    User.login(req.body.email, req.body.password, function(result) {
        if (result) {
            req.session.user = result;
            req.session.opp = 1;
            res.redirect("/profile");
        } else {
            req.flash("error", "The password or the email are incorrect");
            res.render("login", { message: req.flash("error") });
        }
    });
});

/////////GETTING THE REGISTER PAGE//////////

router.get("/register", (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.redirect("/profile");
        return;
    }
    res.render("register");
});

////////IF USER SUBMIT REGISTER//////////

router.post("/register", (req, res, next) => {
    let userInput = {
        username: req.body.userName,
        useremail: req.body.email,
        password: req.body.password
    };
    User.create(userInput, function(lastid) {
        if (lastid) {
            User.find(lastid, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect("/profile");
            });
        } else {
            console.log("Error createing a new user");
        }
    });
});

//////////GETTING CONTACTS PAGE//////////

router.get("/contacts", (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.render("contacts", {
            opp: req.session.opp,
            name: User.useremail,
            title: "profile"
        });
        return;
    }
    res.redirect("/log");
});
router.get("/profile", (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.render("contacts", {
            opp: req.session.opp,
            name: user.useremail,
            title: "profile"
        });
        return;
    }
    res.redirect("/log");
});
module.exports = router;
