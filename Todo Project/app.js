const express = require("express");
const app = express();
const { readUsers } = require("./controllers/authController");
const authRouter = require("./routers/auth");
const taskRouter = require("./routers/task");
require("dotenv").config();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
  readUsers();
});

// taskData[taskIndex].userId!==userId
// 403

//user id ,username,email,password  -> user.txt [{},{},{}]

//Task -> id,desc,title ,userId -> create,getByUserId,getById,delete,update
