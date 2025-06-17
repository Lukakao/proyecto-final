const mongoose = require("mongoose");


const ratingSchema = new mongoose.Schema({
  user: { // El usuario que da el rating
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  value: { // Valor de 1 a 5
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ratings: [ratingSchema],
  publications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication"
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
