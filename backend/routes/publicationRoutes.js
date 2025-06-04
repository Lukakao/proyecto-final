const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");

router.post("/publications", publicationController.createPublication);
//router.get("/publications", publicationController.getUsers);

module.exports = router;