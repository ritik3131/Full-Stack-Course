const db = require("../config/db");

const Post = db.Post;
const Like = db.Like;

const createPost = async (req, res, next) => {
  try {
    const { title, desc, imageUrl } = req.body;

    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    const post = { title, desc, imageUrl, userId: req.session.user.id };

    await Post.create(post);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const giveLike = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    const { id: userId } = req.session.user;
    const { postId } = req.params;

    console.log(postId, userId);

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post doesn't exist" });
    }

    const existingLike = await Like.findOne({
      where: { userId: userId, postId: ParseInt(postId) },
    });

    if (existingLike) {
      return res.status(400).json({ error: "Aldready Liked" });
    }

    //TODO check in dislikes

    await Like.create({ userId, postId });
    res.status(201).json({ userId, postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  giveLike,
};
