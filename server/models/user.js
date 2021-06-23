const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  name: String,
  email: String,
  picture: String,
  profileDescription: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
