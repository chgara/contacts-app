const express = require("express");
const colors = require("colors");
const path = require("path");
const app = express();
const morgan = require("morgan");
const routes = require("./router");

app.use(express.json());

app.use(express.static(path.join(__dirname + "/src/public")));

app.use(morgan("tiny"));

app.use(routes);

app.listen(process.env.PORT || 3000, function() {
    console.log(
        "Example app listening on port: ".cyan.bold +
            `${this.address().port}`.magenta.bold
    );
});
