const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const colors = require("colors");
const passport = require("passport");
const coockieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const pageRouter = require("./app/router");
const { database } = require("./database/database");

const app = express();

app.set("port", process.env.PORT || 3000);

//////SETTINGS///////
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

////////STATIC FILES////////

app.set(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));

//////////Midlewares//////////

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "contacts secret app",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//////////GLOBAL//////////
app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.error = req.flash("error");
    app.locals.success = req.flash("success");
    next();
});
app.use(morgan("dev"));

//////////Routes//////////

app.use("/", pageRouter);

///////////Global//////////

app.use((req, res, next) => {
    let error = new Error();
    res.render("404");
    next();
});

//appListening//
app.listen(
    app.get("port"),
    console.log(`Server on port: ${app.get("port")}`.cyan)
);
