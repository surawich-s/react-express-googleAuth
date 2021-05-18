const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.post("/google", googleAuthController.googleLogin);
router.delete("/logout", googleAuthController.googleLogout);
router.get("/me", googleAuthController.getUserData);

module.exports = router;
