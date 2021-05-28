const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userAvatar: String,
  postImage: String,
  postDescription: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
