const Publication = require("../models/publicationModel");
const validator = require('validator')

exports.createPublication = async (publicationData) => {
    const newPublication = new Publication(publicationData);
    return await newPublication.save();
}