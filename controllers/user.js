const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.query.id === "" || req.query.id === undefined) {
      throw new Error("Please provide user id");
    }
    const user = await User.findByIdAndDelete(req.query.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    ) {
      throw new Error("Please fill all the fields");
    }
    const findUserByEmail = await User.findOne({ email });
    if (findUserByEmail) {
      throw new Error("User already exists");
    }
    // create hash password
    const HashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: HashedPassword });
    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//login user and return jwt token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    ) {
      throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    // check if user exists and password is correct
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not registered with this email" });
    }
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // generate jwt token and return
    const token = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  deleteUser,
};
