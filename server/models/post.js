const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: String,
  userId: String,
  profileLogo: String,
  profileLink: String,
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
