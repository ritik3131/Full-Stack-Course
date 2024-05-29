const express = require("express");
const router = express.Router();
let { people } = require("../data");
const {
  getAllPeople,
  createPeople,
  createPostmanPeople,
  updatePeople,
  deletePeople,
} = require("../controllers/peopleController");

// router.get("/", getAllPeople);

// router.post("/", createPeople);

// router.put("/:id", updatePeople);

// router.delete("/:id", deletePeople);
router.post("/postman", createPostmanPeople);

router.route("/").get(getAllPeople).post(createPeople);

router.route(":id").put(updatePeople).delete(deletePeople);

module.exports = router;

// user -> login,signup
// user->id,email,password,name
// tasks -> title,desc,id,userId,status
// admin -> id:1 admin

// /api/tasks -> create tasks {},update tasks {},delete tasks,getallTask ,getOneTask
