const express = require("express");
const router = express.Router();
const { login, verify } = require('../controllers/LoginController');

router.post("/login", login)
router.post("/verify", verify)
module.exports = router;
