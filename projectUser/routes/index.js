const express = require("express");
const router = express.Router();
const { createUser, getUserList  } = require('../controllers/UserController')

router.post("/register", createUser);
router.get("/userlist", getUserList);

module.exports = router;
