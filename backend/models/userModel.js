const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  //email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }
  // Check whether there is a user
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not in use,You want to Sign Up?");
  }

  // comparing password whether passwords match
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong Password!");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
