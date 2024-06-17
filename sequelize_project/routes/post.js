const express = require("express");
const { createPost, giveLike } = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);
router.post("/:postId/like", giveLike);

module.exports = router;