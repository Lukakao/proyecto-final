const publicationService = require('../services/publicationService')

exports.createPublication = async (req,res) => {
    try {
        const newPublication = await publicationService.createPublication(req.body)
        res.status(201).json({ newPublication });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}