const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
