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
      return res.status(201).json(users);
    }
    else{
      res.status(500).json({ error: 'Error fetching users'});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.body);
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

exports.getUserPublications = async (req, res) => {
  try {
    const userPublications = await userService.getUserPublications(req.params.userId);
    res.status(201).json(userPublications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateUserEmail = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserEmail(req);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const token = await userService.userLogin(req);
    if (!token){
      return res.status(500).json({ error: 'Error in login' });
    }
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};