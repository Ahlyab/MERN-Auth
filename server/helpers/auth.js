const bycrpt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bycrpt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bycrpt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bycrpt.compare(password, hashed);
};

module.exports = { hashPassword, comparePassword };
