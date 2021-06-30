const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/:id", postController.fetchUserPosts);
router.get("/", postController.fetchPosts);
router.patch("/:id", postController.updatePost);
router.get("/p/:id", postController.fetchPostById);
router.post("/p/:id/comment", postController.createComment);
router.get("/p/:id/comment", postController.fetchComments);
router.post("/p/:id/like", postController.likePost);

module.exports = router;
