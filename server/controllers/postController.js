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
    const fetchedPost = await Post.findById(id);
    console.log(fetchedPost.postDescription);
    res.status(201).json(fetchedPost);
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
