const Todo = (sequelize, DataTypes) => {
  sequelize.define(
    "todo",
    {
      // Model attributes are defined here
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: "Gupta",
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: "todo",
    }
  );
};
module.exports = Todo;
