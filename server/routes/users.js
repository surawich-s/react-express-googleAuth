const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");
const userController = require("../controllers/userController");

router.get("/google", googleAuthController.googleLogin);
router.get("/auth/google/callback", googleAuthController.googleLoginCallback);
router.get("/auth/google/success", googleAuthController.googleLoginSuccess);
router.get("/auth/google/failure", googleAuthController.googleLoginFailure);
router.delete("/logout", googleAuthController.googleLogout);

router.get("/user", userController.getUser);
router.get("/user/:id", userController.fetchUser);
router.patch("/user/:id", userController.updateUser);

module.exports = router;
