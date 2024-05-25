const express = require("express");

const app = express();
//localhost:5000/
const path = require("path");

// app.use(express.static('./public'))
// http://localhost:5000/styles.css
// http://localhost:5000/javascript.css
// http://localhost:5000/logo.png
//req => use => res
const { products } = require("./data");
app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req.params);
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if(!singleProduct){
    res.status(200).send("<h1>Product is not found</h1>");
  }

  console.log(singleProduct);

  return res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  const { productID ,reviewID} = req.params;
  console.log(productID,reviewID);
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  console.log(singleProduct);
  if(!singleProduct){
    return res.status(200).send("<h1>Product is not found</h1>");
  }


  return res.json(singleProduct);
});

// localhost:5000/api/v1/query?search=a&limit=1
app.get('/api/v1/query', (req, res) => {
  // console.log(req.query)
  const { search, limit } = req.query
  let sortedProducts = [...products]
  console.log(search,limit)
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] })
  }
  res.status(200).json(sortedProducts)
})
// "{}"

app.get("/about", (req, res) => {
  res.status(404).send("About Page");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

//all post put get delete

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});

//get
//post
//put
//delete
//all
//use
