const User = require("../models/users");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checks
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "password is required and should be at least 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already used",
      });
    }

    const hashedPassword = await hashPassword(password);
    console.log("hashed : " + hashedPassword);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    console.log(user);

    console.log("Password: " + password + "\nUser.password : " + user.password);

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET
      );
    }
    if (!match) {
      return res.json({ error: "Incorrect Password!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { test, registerUser, loginUser };
