const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const morgan  = require("morgan");
//  req => middleware => res
// app.use([logger, authorize])
// app.use("/api", [authorize, logger]);

// http://localhost:5000/?user=john
// custom , express , thrid 
app.use(morgan('tiny'));
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  const { id } = req.user;
  console.log(req.user, id);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
