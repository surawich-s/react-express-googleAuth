require("dotenv").config();
require("../auth");
const passport = require("passport");

exports.googleLogin = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.googleLoginCallback = passport.authenticate("google", {
  successRedirect: "/api/v1/auth/google/success",
  failureRedirect: "/api/v1/auth/google/failure",
});

exports.googleLoginSuccess = (req, res) => {
  // res.send("Login success");

  res.send("<script>window.close();</script > ");

  // console.log(req.user._id);
  // res.status(200).json(req.user);
};

exports.googleLoginFailure = (req, res) => {
  res.status(401).json({
    message: "Unauthorized",
  });
};

exports.googleLogout = async (req, res) => {
  req.logout();
  await req.session.destroy();
  res.status(200).json({
    message: "Logged out successfully",
  });
};
