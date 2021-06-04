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
  const { id } = req.params;

  const posts = await Post.find({ userId: id });

  res.status(201).json(posts);
};

exports.fetchPosts = async (req, res) => {
  const posts = await Post.find();
  // console.log(posts);
  res.status(201).json(posts);
};

exports.updatePost = async (req, res) => {
  // similar to update
  const { userId, userName, commentDetail, createdAt } = req.body;
  const { id } = req.params;

  await Post.findAndUpdate(
    { _id: id },
    {
      $push: {
        comments: {
          userId: userId,
          userName: userName,
          commentDetail: commentDetail,
          createdAt: createdAt,
        },
      },
    },
    { new: true },
    (err, result) => {
      // Rest of the action goes here
    }
  );
  // try {
  //   const updatedPost = await toBeSavedPost.save();
  //   console.log(updatedPost);
  //   res.status(201).json(updatedPost);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
