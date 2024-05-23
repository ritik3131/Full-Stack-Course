const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.write("Welcome to our home page");
  } else if (url === "/about") {
    res.write("Welcome to our about page");
  } else {
    res.write("Page not found");
  }
  console.log("Hello!!!");
  res.end();
});

server.listen(5000);
