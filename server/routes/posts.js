const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/:id", postController.fetchUserPosts);
router.get("/", postController.fetchPosts);
router.post("/:id", postController.updatePost);
router.get("/p/:id", postController.fetchPostById);
// router.post("/:id/like", postController.likePost);

module.exports = router;
