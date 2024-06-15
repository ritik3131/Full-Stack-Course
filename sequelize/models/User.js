const User = (sequelize,DataTypes) => {
  return sequelize.define(
    "user",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "Gupta",
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: "users1",
    }
  );
};
module.exports = User;
// const saveObj = async () => {
//   await User.sync({ force: true });
//   const jane = await User.create({ firstName: "Ritik" });
//   //   console.log(jane instanceof User); // true
//   //   await jane.save();
//   jane.set({ lastName: "singh", firstName: "abc" });
//   //   console.log()
//   await jane.save({ fields: ["firstName"] });
//   console.log(jane.firstName, jane.lastName);
//   //   await jane.update({ lastName: "Ada" });
//   await jane.reload();
//   console.log(jane.firstName, jane.lastName);
//   // console.log(jane.toJSON()); // This is good!
//   //   await jane.destroy();
//   //   console.log(JSON.stringify(jane, null, 4)); // This is also good!
//   console.log("Jane was saved to the database!");
// };
// saveObj();
// `sequelize.define` also returns the model
