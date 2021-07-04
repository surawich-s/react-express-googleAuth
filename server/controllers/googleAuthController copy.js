require("dotenv").config();
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  // const count = await User.countDocuments({ email });

  await User.findOne({ email: email }, async (err, user) => {
    if (err) throw err;
    if (user) {
      console.log(user.name + " was logged in");
      // console.log(req.session);
      req.session.userId = user._id;
      res.status(201);
      res.json(user);
    } else {
      try {
        const newUser = await User.create({
          email,
          name,
          picture,
        });
        console.log(name + " is logged in");

        req.session.userId = newUser._id;
        res.status(201);
        res.json(newUser);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  });

  // if (count > 0) {
  //   try {
  //     const user = await User.findOne({ email: email });
  //     console.log(user.name + " was logged in");
  //     req.session.userId = user._id;
  //     res.status(201);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }
  // } else {
  //   try {
  //     const user = await User.create({
  //       email,
  //       name,
  //       picture,
  //     });
  //     console.log(name + " is logged in");

  //     req.session.userId = user._id;
  //     res.status(201);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }
  // }

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

exports.getUserData = (req, res) => {
  res.status(200);
  res.json(req.user);
};
