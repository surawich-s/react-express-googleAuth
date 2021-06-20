const User = require("../models/user");

exports.fetchUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  console.log(user.name + " is fetched");

  res.status(201);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = req.body._id === req.user._id ? req.body : null;
  const { id } = req.params;

  try {
    const updatedUser = await Post.findByIdAndUpdate(id, user, { new: true });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getUserData = (req, res) => {
  res.status(200);
  res.json(req.user);
};
