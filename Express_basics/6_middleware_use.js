const express = require("express");
const app = express();
const logger = require("./logger");
app.get("/", logger, (req, res) => {
  res.send("Home");
});
app.get("/about", logger, (req, res) => {
  res.send("About");
});
app.get("/api/products", logger, (req, res) => {
  res.send("Products");
});
app.get("/api/items", logger, (req, res) => {
  res.send("Items");
});

// ------------------------------------------------------------------------------
//  req => middleware => res
// If this app.use is used below any api then that middleware will be not used in that api
app.use(logger);
// app.use('/api',logger)
// api/home/about/products
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
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
