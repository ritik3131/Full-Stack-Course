const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRouter = require("./routes/auth");
const db = require("./config/db");
require("dotenv").config();

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(3000, () => {
  db.sequelize.sync();
  console.log("Server started on port 3000");
});
