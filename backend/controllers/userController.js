const User = require("../models/userModel");
const mongoose = require("mongoose");

// login
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

//signup
const signupUser = async (req, res) => {
  res.json({ mssg: "signup user" });
};

module.exports = {
  loginUser,
  signupUser,
};
