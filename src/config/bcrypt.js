const bcrypt = require("bcryptjs");

encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
comparePasswords = async (password, dbpassword) => {
    try {
        return await bcrypt.compare(password, dbpassword);
    } catch (err) {
        console.error(err);
    }
};
module.exports = { encryptPassword, comparePasswords };
