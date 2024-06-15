const express = require("express");
const db = require("./config/db");
const app = express();

app.get("/api/user2", async (req, res) => {
  const users = await db.User.findAll({
    attributes: [
      [db.sequelize.fn("COUNT", db.sequelize.col("lastName")), "n_lastName"],
    ],
  });
  res.json(users);
});

app.get("/api/creatUser", async (req, res) => {
  await db.User.create({
    firstName: "Ritik",
    lastName: "Gupta",
  });
  res.send("Hello");
});

app.get("/api/user/:userID", async (req, res) => {
  const { userID } = req.params;
  const users = await db.User.findAll({
    where: {
      id: [1, 2],
    },
  });
  res.json(users);
});

app.get("/api/user/:userID", async (req, res) => {
  const { userID } = req.params;
  const users = await db.User.findAll({
    where: sequelize.where(
      sequelize.fn("char_length", sequelize.col("content")),
      7
    ),
  });
  res.json(users);
});

app.get("/api/user", async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
});

app.listen(3000, () => {
  db.sequelize.sync();
  console.log("App is listening at 3000 port");
});
