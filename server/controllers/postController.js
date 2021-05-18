require("dotenv").config();
const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();
    console.log(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  // res.send("POSTED");
};
