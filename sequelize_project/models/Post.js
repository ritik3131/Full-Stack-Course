module.exports = (sequelize, DataTypes, User) => {
  const Post = sequelize.define("Post", {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },      // allowNull defaults to true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Assuming you have a 'Users' model
        key: "id",
      },
      // allowNull defaults to true
    },
  });
  //   User.hasMany(Post);
  //   Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
  return Post;
};
