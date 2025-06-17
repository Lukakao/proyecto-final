const User = require("../models/userModel");
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.createUser = async (userData) => {
  //validaciones:
  //email valido
  //email que no exista en db
  //contraseña mayor o igual a 6 caracteres
  if (!validator.isEmail(userData.email)){
    throw new Error("Not a valid Email");
  }
  if (userData.password.length < 6) {
      throw new Error("Password too short");
  }
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
      throw new Error("Email already exists");
  }
  const validRoles = ['user', 'admin'];
  if (userData.role && !validRoles.includes(userData.role)) {
    throw new Error("Role not valid");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  const newUser = new User(userData);
  return await newUser.save();
};


exports.getUsers = async () => {
  const users = User.find();
  return await users;
};

exports.deleteUser = async (userData) => {
  const deletedUser = await User.findByIdAndDelete(userData.userId);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return deletedUser;
};

exports.getUserPublications = async (userId) => {
  const user = await User.findById(userId).populate('publications');
  if (!user) {
    throw new Error("User not found");
  }
  return user.publications;
};

exports.updateUserEmail = async (req) => {
  const userData = req.body;
  if (!validator.isEmail(userData.email)){
    throw new Error("Not a valid Email");
  }
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { name: userData.name, email: userData.email },
    { new: true }
  );
  return user;
}

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Incorrect password");

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};


//TODO:
//mostrar publicaciones del usuario y checkear si todas siguen existiendo (eliminar del array de publicaiones si ya no existe en db)
