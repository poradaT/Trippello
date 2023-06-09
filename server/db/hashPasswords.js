const bcrypt = require("bcryptjs");

const hashedPasswords = {
  password1: bcrypt.hashSync("password1", bcrypt.genSaltSync(10)),
  password2: bcrypt.hashSync("password2", bcrypt.genSaltSync(10)),
  password3: bcrypt.hashSync("password3", bcrypt.genSaltSync(10)),
};

console.log(hashedPasswords);

module.exports = hashedPasswords;
