const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const pool = require("../database/database");
const bcrypt = require("../config/bcrypt");

passport.use(
    "local.login",
    new LocalStrategy(
        {
            usernameField: "useremail",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, useremail, password, done) => {
            const sql = "Select * from useres where useremail = ?";
            const rows = await pool.query(sql, [useremail]);
            if (rows.length > 0) {
                const user = rows[0];
                const password = password;
                const dbpassword = user.password;
                const comparePassword = bcrypt.comparePasswords(
                    password,
                    dbpassword
                );

                if (comparePassword) {
                    done(null, user);
                } else {
                    return done(
                        null,
                        false,
                        req.flash("error", "The password are incorrect")
                    );
                }
            } else {
                return done(
                    null,
                    false,
                    req.flash("error", "The email not exists")
                );
            }
        }
    )
);

passport.use(
    "local.register",
    new LocalStrategy(
        {
            usernameField: "useremail",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, useremail, password, done) => {
            const user = { useremail, username: req.body.username };
            user.password = await bcrypt.encryptPassword(password);

            const emailExists = await pool.query(
                "SELECT * FROM users WHERE useremail = ?",
                user.useremail
            );
            const nameExists = await pool.query(
                "SELECT * FROM users WHERE username = ?",
                user.username
            );
            if (emailExists.length > 0 || nameExists.length > 0) {
                if (emailExists.length > 0) {
                    return done(
                        null,
                        false,
                        req.flash("error", "The email is allredy i use")
                    );
                } else {
                    return done(
                        null,
                        false,
                        req.flash("error", "The username is alredy taken")
                    );
                }
            } else {
                await pool.query("INSERT INTO users SET ?", [user]);
                return done(null, user);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serialize :", user);
    done(null, user.username);
});
passport.deserializeUser(async (id, done) => {
    const user = await pool.query("SELECT * FROM users WHERE username = ?", [
        id
    ]);
    done(null, user[0]);
});
