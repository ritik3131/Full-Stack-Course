const db = require("../config/db");

const Post = db.Post;
const Like = db.Like;
const Dislike = db.Dislike;

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
      where: { userId: userId, postId: parseInt(postId) },
    });

    if (existingLike) {
      return res.status(400).json({ error: "Aldready Liked" });
    }

    const existingDislike = await Dislike.findOne({
      where: { userId: userId, postId: parseInt(postId) },
    });

    if (existingDislike) {
      await existingDislike.destroy();
    }

    await Like.create({ userId, postId });
    res.status(201).json({ userId, postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const giveDislike = async (req, res, next) => {
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

    const existingDislike = await Dislike.findOne({
      where: { userId: userId, postId: parseInt(postId) },
    });

    if (existingDislike) {
      return res.status(400).json({ error: "Aldready Disliked" });
    }

    const existingLike = await Like.findOne({
      where: { userId: userId, postId: parseInt(postId) },
    });

    if (existingLike) {
      await existingLike.destroy();
    }


    await Dislike.create({ userId, postId });
    res.status(201).json({ userId, postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  let posts = JSON.parse(
    JSON.stringify(
      await Post.findAll({
        attributes: ["id", "title", "desc"],
      })
    )
  );

  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].id;
    const countLikes = await Like.count({
      where: { postId: postId },
    });
    const countDislikes = await Dislike.count({
      where: { postId: postId },
    });
    posts[i].numLikes = countLikes;
    posts[i].numDisLikes = countDislikes;
  }
  res.status(200).json({ posts: posts });
};

const getOnePost = async (req, res) => {
  const { postId } = req.params;
  let post = JSON.parse(JSON.stringify(await Post.findByPk(postId)));

  if (!post) {
    return res.status(404).json({ error: "Post doesn't exist" });
  }

  const countLikes = await Like.count({
    where: { postId: postId },
  });
  const countDislikes = await Dislike.count({
    where: { postId: postId },
  });
  post.numLikes = countLikes;
  post.numDisLikes = countDislikes;

  res.status(200).json({ post: post });
};

updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, desc, imageUrl } = req.body;

    // Check if the user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //postId-1 userId-1
    //postId-1 userId-2

    const userId = req.session.user.id;

    // Check if the post exists and belongs to the user
    const post = await Post.findOne({ where: { id: postId, userId } });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    // Update the post
    post.title = title || post.title;
    post.desc = desc || post.desc;
    post.imageUrl = imageUrl || post.imageUrl;
    await post.save();

    res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if the user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;

    // Check if the post exists and belongs to the user
    const post = await Post.findOne({ where: { id: postId, userId } });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    }

    // Delete the post and associated like and dislike entries
    await Like.destroy({ where: { postId } });
    await Dislike.destroy({ where: { postId } });
    await post.destroy();

    //On cascade post deletion like and dislike

    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createPost,
  giveLike,
  giveDislike,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
};
