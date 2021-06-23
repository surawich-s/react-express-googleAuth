const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  following: String,
  followed: String,
});
const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
