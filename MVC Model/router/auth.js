const express = require("express");
const router = express.Router();
let { people } = require("../data");
const login = require('../controllers/authController')

router.post("/", login);

module.exports = router;
