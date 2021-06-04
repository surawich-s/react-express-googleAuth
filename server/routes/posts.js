const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/:id", postController.fetchUserPosts);
router.get("/", postController.fetchPosts);
router.post("/:id", postController.updatePost);

module.exports = router;
