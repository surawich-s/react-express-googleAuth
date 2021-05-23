const User = require("../models/user");

exports.fetchUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  console.log(user.name + " is fetched");

  res.status(201);
  res.json(user);
};
