const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
const User = require("../models/user");

exports.createPost = async (req, res) => {
  const { postImage, postDescription } = req.body;

  const newPost = new Post({ _user: req.user._id, postImage, postDescription });

  // console.log(newPost);

  try {
    await newPost.save();
    await User.findByIdAndUpdate(req.user._id, { $inc: { postCount: 1 } });
    res.status(201).json(newPost);
    console.log("Post created by " + newPost._user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.fetchUserPosts = async (req, res) => {
  const { id } = req.params;

  const posts = await Post.find({ _user: id }).select(
    "_id postImage commentsCount likesCount"
  );

  res.status(201).json(posts);
};

exports.fetchPosts = async (req, res) => {
  const posts = await Post.find().populate({
    path: "_user",
    select: "_id name picture",
  });
  // console.log(posts);
  res.status(201).json(posts);
};

exports.updatePost = async (req, res) => {
  const post = req.body;
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    // console.log(updatedPost.comments);
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.fetchPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const fetchedPost = await Post.findById(id).populate({
      path: "_user",
      select: "_id name picture",
    });
    // console.log(fetchedPost.postDescription);
    res.status(201).json(fetchedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const { id } = req.params;
  const _user = req.user;
  const commentDetail = req.body;
  try {
    const newComment = await Comment.save({ _user, _post: id, commentDetail });
    await res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.fetchComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ _post: id }).populate({
      path: "_user",
      select: "_id name picture",
    });
    console.log(comments);
    // res.status(201).json(comments)
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;
  const like = req.body;
  try {
    const likedPost = await Post.findByIdAndUpdate(id, {
      $inc: { likesCount: 1 },
    });
    await Like.save(like);
    res.status(201).json(likedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// exports.commentPost = async (req, res) => {
//   const comment = req.body;
//   const { id } = req.params;
//   try {
//     const updatedPost = await Post.findOneAndUpdate(
//       { _id: id },
//       { $push: { comments: comment } }
//     );

//     // console.log(updatedPost);
//     res.status(201).json(updatedPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// exports.likePost = async (req, res) => {
//   const likeData = req.body;
//   const { id } = req.params;
//   console.log(likeData);
//   const check = await Post.findOne({
//     _id: id,
//     comments: { userId: likeData.userId },
//   });
//   // const newCheck = check.likes.map((like) =>
//   //   like.userId === likeData.userId ? like.pop() : ""
//   // );
//   console.log(check);
//   // console.log(Object.keys(check.likes).length); // ES6 length of OBJ
//   // if(check){
//   //   try{
//   //     const likedPost = await Post.findOneAndUpdate({_id: id}, {$push: {likes: like}})
//   //     res.status(201).json(likedPost);
//   //   } catch(error) {
//   //     res.status(409).json({message: error.message})
//   //   }
//   // } else {
//   //   try{
//   //     const unlikedPost = await Post.fineOneAndDelete
//   //   }
//   // }
// };
