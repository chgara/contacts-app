const registerAuth = async (req, res, username, email, password, password2) => {
    //check all the data
    if (!username || !email || !password || !password2) {
        /*errors.push({ error: "Please fill in all the fields" })*/
        req.flash("error", "Please fill all the fields");
    }

    //cheking the passwords
    if (password !== password2) {
        /* errors.push({ error: "The passwords dose´nt match" })*/
        req.flash("error", "The passwords are different");
    }
    const reqflash = req.flash("error");
    if (reqflash.length) {
        res.render("register", {
            errors: reqflash,
            username,
            email,
            password,
            password2
        });
        return false;
    } else {
        return true;
    }
};

const loginAuth = async (req, res, email, password) => {
    //check all the data
    if (!email || !password) {
        req.flash("error", "Please fill all the fields");
        res.render("login", {
            errors: req.flash("error"),
            email,
            password
        });
        return false;
    } else {
        return true;
    }
};

module.exports = { registerAuth, loginAuth };
