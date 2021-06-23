const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postImage: String,
  postDescription: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
