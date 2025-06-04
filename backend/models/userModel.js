const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  publications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication"
  }]
});
const User = mongoose.model("User", userSchema);
module.exports = User;
