const mysql = require("mysql2");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || "3001";

const app = express();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

async function getAllnotes() {
  const result = await connection.query("select * from Users where id=1");
  // console.log(result);
  console.log(result[0]);
  //backend->database
  //backend      frontend->backend->db->db.close()->frontend

  // const [rows] = await connection.query("select * from Users");
  // console.log(rows);
  // const [rows] = await connection.query("select * from Users");
  // return rows;
}
// getAllnotes();

// const notes = await getAllnotes();
// console.log(notes);

async function getNote(id) {
  const results = await connection.query(`
    SELECT * 
    FROM Users
    WHERE id = ?
    `,[id]);
  console.log(results[0])
}
// id-> 0 OR true ``
getNote("0 OR true");
// console.log(note);

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "This is not why you're here. Head to /user/:id and replace :id with your user id"
    );
});
// table -> object
//sql query or orm .create .insert .find .findAll
// const userRouter = require("./routes/user");
// app.use("/user", userRouter);

/**Start listening */
app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});

// {,.....f15}