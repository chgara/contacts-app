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
const {
  getContacts,
  deleteContacts,
  addContact,
  editContact
} = require("../database/contacts");

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
  res.render("new-contact", {
    action: "New Contact",
    href: "/contacts/add"
  });
});
router.get("/options", isAuthenticated, async (req, res, next) => {
  res.render("options");
});
router.get("/contacts", isAuthenticated, async (req, res, next) => {
  const username = req.user.username;
  const contacts = await getContacts(username);
  res.render("contacts", {
    title: "Contacts",
    contacts: contacts
  });
});
router.get("/contacts/delete/:id", isAuthenticated, async (req, res, next) => {
  const contactId = req.params.id;
  const username = req.user.username;
  deleteContacts(contactId, username).then(() => {
    res.redirect("/contacts");
  });
});
router.get("/contacts/edit/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  res.render("new-contact", {
    action: "Edit",
    href: `/contacts/edit/${id}`
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

router.post("/contacts/add", isAuthenticated, async (req, res, next) => {
  const { name, relation, number } = req.body;
  const username = req.user.username;
  const href = "/contacts/add";
  const action = "New Contact";
  const success = newContact(req, res, name, relation, number, href, action);
  if (success) {
    await addContact(username, name, relation, number).then(() => {
      req.flash("success", "Contact added successfully");
      res.redirect("/contacts");
    });
  }
});

router.post("/contacts/edit/:id", isAuthenticated, async (req, res, next) => {
  const { name, relation, number } = req.body;
  const id = req.params.id;
  const username = req.user.username;
  const href = `/contacts/edit/${id}`;
  const action = "New Contact";
  const success = newContact(req, res, name, relation, number, href, action);

  if (success) {
    await editContact(id, username, name, relation, number).then(() => {
      req.flash("success", "Contact edited successfully");
      res.redirect("/contacts");
    });
  }
});

///////Data trans///////

module.exports = router;
