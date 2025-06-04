const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  commune: {
    type: String,
    required: false,
  },
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
