const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log("Post created by " + newPost.userId);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  // res.send("POSTED");
};

exports.fetchUserPosts = async (req, res) => {
  const { id } = req.query;

  console.log(id);

  const posts = await Post.find({ userId: id });

  res.status(201).json(posts);
};
