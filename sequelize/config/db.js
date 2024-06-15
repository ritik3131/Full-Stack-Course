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
db.Todo= require('../models/Todo')(db.sequelize,db.DataTypes);
module.exports =db;