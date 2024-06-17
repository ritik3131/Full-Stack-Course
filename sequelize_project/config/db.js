const { Sequelize,DataTypes } = require("sequelize");
require('dotenv').config();
let db={};
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port:3306
  }
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB();
db.sequelize=sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.User= require('../models/User')(db.sequelize,db.DataTypes);
db.Post= require('../models/Post')(db.sequelize,db.DataTypes,db.User);
db.Like= require('../models/Like')(db.sequelize,db.DataTypes,db.User);
db.Dislike= require('../models/Dislike')(db.sequelize,db.DataTypes,db.User);

db.Post.belongsToMany(db.User, {
  through: db.Like,
  foreignKey: "postId",
  otherKey: "userId",
});

db.User.belongsToMany(db.Post, {
  through: db.Like,
  foreignKey: "userId",
  otherKey: "postId",
});

db.Post.hasMany(db.Like, {
  foreignKey: "postId",
});

db.Like.belongsTo(db.Post, {
  foreignKey: "postId",
});

db.User.hasMany(db.Like, {
  foreignKey: "userId",
});

db.Like.belongsTo(db.User, {
  foreignKey: "userId",
});

db.Post.hasMany(db.Dislike, {
  foreignKey: "postId",
});

db.Dislike.belongsTo(db.Post, {
  foreignKey: "postId",
});

db.User.hasMany(db.Dislike, {
  foreignKey: "userId",
});

db.Dislike.belongsTo(db.User, {
  foreignKey: "userId",
});

module.exports =db;