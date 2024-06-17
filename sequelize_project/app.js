const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const db = require("./config/db");
const { sessionMiddleware, cookieParser } = require("./config/session");
require("dotenv").config();

const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use(cookieParser);
app.use(sessionMiddleware);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(3000, () => {
  db.sequelize.sync();
  console.log("Server started on port 3000");
});
