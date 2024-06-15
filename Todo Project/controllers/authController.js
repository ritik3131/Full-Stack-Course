const { writeFile, readFile } = require("fs/promises");
let userData = []; //array of user

const readUsers = async () => {
  try {
    const users = await readFile("./user.txt", "utf-8"); //string
    userData = JSON.parse(users);
  } catch (err) {
    console.log("Error reading:", err);
  }
};

const writeUsers = async () => {
  try {
    await writeFile("./user.txt", JSON.stringify(userData)); //string
  } catch (err) {
    console.log("Error reading:", err);
  }
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  const emailCheck = email.split("@");
  try {
      const user = userData.find((user) => user.email === email);
      if (user) {
        return res.status(409).json({ error: "this user already exists" });
      }

      const newPerson = { id: userData.length + 1, username, password, email };
      userData.push(newPerson);
      await writeUsers();

      res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = userData.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(404).json({ error: "Invaild password!!" });
  }

  res.status(200).json({ message: "Successfully logged in" });
};

module.exports = { readUsers, writeUsers, login, signup };
