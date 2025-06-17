const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");
const adminAuth = require('../middleware/adminAuth');

router.post("/publications",adminAuth, publicationController.createPublication);
router.get("/publications",adminAuth, publicationController.getPublications);
router.delete("/publications",adminAuth, publicationController.deletePublication);
router.put("/publications",adminAuth, publicationController.updatePublication);


module.exports = router;