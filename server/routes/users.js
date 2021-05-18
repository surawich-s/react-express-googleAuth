const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.post("/google", googleAuthController.googleLogin);
router.delete("/logout", googleAuthController.googleLogout);

module.exports = router;
