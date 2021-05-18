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
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      name,
      picture,
    },
    { new: true, upsert: true }
  );

  console.log(name + " is logged in");

  req.session.userId = user.id;
  res.status(201);
  res.json(user);
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

exports.getUserData = (req, res) => {
  console.log(req.session.userId);
  res.status(200);
  res.json(req.user);
};
