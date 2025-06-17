const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminAuth = require('../middleware/adminAuth');

router.post("/users",adminAuth, userController.createUser);
router.get("/users",adminAuth, userController.getUsers);
router.delete("/users",adminAuth, userController.deleteUser);
router.get("/users/:userId/publications",adminAuth, userController.getUserPublications);
router.put("/users/:userId/",adminAuth, userController.updateUserEmail);
router.post("/login", userController.userLogin);

module.exports = router;