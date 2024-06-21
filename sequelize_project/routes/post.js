const express = require("express");
const {
  createPost,
  giveLike,
  giveDislike,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:postId", getOnePost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);
router.post("/:postId/like", giveLike);
router.post("/:postId/dislike", giveDislike);

module.exports = router;
