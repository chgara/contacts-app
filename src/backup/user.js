const pool = require("../database");
const bcrypt = require("bcryptjs");

function user() {}

user.prototype = {
    // Find the user data by id or username.
    find: function(user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? "id" : "useremail";
        }
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        pool.query(sql, user, function(err, result) {
            if (err) throw err;

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object
    create: function(body, callback) {
        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd, 10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO users(username, useremail, password) VALUES (?, ?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if (err) throw err;
            callback(result.insertId);
        });
    },

    login: function(useremail, password, callback) {
        // find the user data by his username.
        this.find(useremail, function(user) {
            // if there is a user by this username.
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
};

module.exports = user;
