require("dotenv").config();
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  const count = await User.countDocuments(email);

  if (count > 0) {
    const user = await User.findOne({ email: email });
    console.log(user);
    console.log(name + " was logged in");

    req.session.userId = user._id;
    res.status(201);
    res.json(user);
  } else {
    const user = await User.create({
      email,
      name,
      picture,
    });
    console.log(name + " is logged in");

    req.session.userId = user.id;
    res.status(201);
    res.json(user);
  }

  // replace old user data with new google user data
  // const user = await User.findOneAndUpdate(
  //   { email: email },
  //   {
  //     name,
  //     picture,
  //   },
  //   { new: true, upsert: true }
  // );
};

exports.googleLogout = async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200);
    res.json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
