const express = require("express");
const User = require("./models/User");
const app = express();

app.listen(3000, () => {
  console.log("App is listening at 3000 port");
});
