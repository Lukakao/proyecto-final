const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");

router.post("/publications", publicationController.createPublication);
router.get("/publications", publicationController.getPublications);
router.delete("/publications", publicationController.deletePublication);
router.put("/publications", publicationController.updatePublication);


module.exports = router;