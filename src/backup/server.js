const express = require("express");
const colors = require("colors");
const path = require("path");
const app = express();
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const pageRouter = require("./app/router");
const { database } = require("./app/database");

////////Database connect////

//////SETTINGS///////
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

////////STATIC FILES////////

app.use(express.static(path.join(__dirname, "public")));

/////MIDDLEWARES/////////

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser("secret"));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 1000 * 30
        }
    })
);
app.use(flash());

////////ROUTES/////////

app.use("/", pageRouter);

//////IF THE URL IS INVALID/////

app.use((req, res, next) => {
    var err = new Error(res.render("404"));
});
app.listen(process.env.PORT || 3000, function() {
    console.log(
        "Example app listening on port: ".cyan.bold +
            `${this.address().port}`.magenta.bold
    );
});
module.exports = app;
