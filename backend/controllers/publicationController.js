const publicationService = require("../services/publicationService");

exports.createPublication = async (req, res) => {
  try {
    const newPublication = await publicationService.createPublication(req.body);
    res.status(201).json({ newPublication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublications = async (req, res) => {
  try {
    const publications = await publicationService.getPublications(req.body);
    res.status(201).json({ publications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const deletedPublication = await publicationService.deletePublication(
      req.body
    );
    res.status(201).json({ deletedPublication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const updatedPublication = await publicationService.updatePublication(req.body);
    res.status(201).json({ updatedPublication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

