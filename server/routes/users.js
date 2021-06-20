const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");
const userController = require("../controllers/userController");

router.post("/google", googleAuthController.googleLogin);
router.delete("/logout", googleAuthController.googleLogout);
router.get("/user/:id", userController.fetchUser);
router.patch("/user/:id", userController.updateUser);

module.exports = router;
