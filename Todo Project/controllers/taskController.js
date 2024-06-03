const { writeFile, readFile } = require("fs/promises");
let taskData = []; //array of task

const readTasks = async () => {
  try {
    const tasks = await readFile("./task.txt", "utf-8"); //string
    taskData = JSON.parse(tasks);
  } catch (err) {
    console.log("Error reading:", err);
  }
};

const writeTasks = async () => {
  try {
    await writeFile("./task.txt", JSON.stringify(taskData)); //string
  } catch (err) {
    console.log("Error reading:", err);
  }
};

const createTask = async (req, res) => {
  const { desc, title, userId } = req.body;
  try {
    const newPerson = { id: taskData.length + 1, desc, title, userId };
    taskData.push(newPerson);
    await writeTasks();

    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
//admin all task / 
// if(process.env.ADMIN_ID===userID)

module.exports = { createTask, readTasks };
