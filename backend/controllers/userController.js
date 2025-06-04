const User = require("../models/userModel");
const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (users) {
      res.status(201).json(users);
    }
    else{
      res.status(500).json({ error: 'Error fetching users'});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
