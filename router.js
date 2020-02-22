const expres = require("express");
const router = new expres.Router();

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/index.html");
});
router.get("/home", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/index.html");
});
router.get("/login", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/loging.html");
});
router.get("/register", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/register.html");
});
router.get("/log", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/log.html");
});
router.get("*", (req, res) => {
    res.sendFile(__dirname + "/src/public/html/404.html");
});
module.exports = router;
