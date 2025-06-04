const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.delete("/users", userController.deleteUser);
router.get("/users/:userId/publications", userController.getUserPublications);
router.put("/users/:userId/", userController.updateUserEmail);

module.exports = router;