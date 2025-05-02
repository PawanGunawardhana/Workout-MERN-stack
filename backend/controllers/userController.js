const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

//function for create tokens
const createToken = (_id) => {
  return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn: '3d'})

}

// login
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

//signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    
    //create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
