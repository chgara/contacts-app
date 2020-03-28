const registerAuth = (req, res, username, email, password, password2) => {
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
  if (username.length > 35) {
    req.flash("error", "The username is to long");
  }
  const reqflash = req.flash("error");
  if (reqflash.length) {
    res.render("register", {
      error: reqflash,
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

const loginAuth = (req, res, email, password) => {
  //check all the data
  if (!email || !password) {
    req.flash("error", "Please fill all the fields");
    res.render("login", {
      error: req.flash("error"),
      email,
      password
    });
    return false;
  } else {
    return true;
  }
};

const newContact = (req, res, name, relation, number, href, action) => {
  //Cheaking all are fill
  if (!name || !relation || !number) {
    req.flash("error", "Please fill all the fields");
  }

  //Cheking the given data
  if (relation.length > 30)
    req.flash(("error", "The relation length is to long"));

  if (name.length > 18) req.flash("error", "The username is to long");

  if (number.length != 11) req.flash("error", "Use the rigth phone format");

  const reqflash = req.flash("error");
  if (reqflash.length) {
    res.render("new-contact", {
      error: reqflash,
      name,
      href: href,
      action: action,
      relation,
      number
    });
    return false;
  } else {
    return true;
  }
};

module.exports = { registerAuth, loginAuth, newContact };
