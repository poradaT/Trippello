const bcrypt = require("bcrypt");

const generateHash = (password) => {
  if (!password) {
    throw new Error("Password is required.");
  }
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = generateHash;
