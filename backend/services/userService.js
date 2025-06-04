const User = require("../models/userModel");
const validator = require('validator')

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

  const newUser = new User(userData);
  return await newUser.save();
};


exports.getUsers = async () => {
  const users = User.find();
  return await users;
};

//TODO:
//mostrar publicaciones del usuario y checkear si todas siguen existiendo (eliminar del array de publicaiones si ya no existe en db)
