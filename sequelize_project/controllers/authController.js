const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = db.User;

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashPassWord = await bcrypt.hash(password, saltRounds);
    const user = {
      email: email,
      password: hashPassWord,
      name: name,
    };
    await User.create(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exists" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json(user);
    
    // console.log(JSON.stringify(req.session.user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  signup,
};
