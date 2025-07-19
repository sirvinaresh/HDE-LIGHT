const express = require("express");
const router = express.Router();
const user = require("../controllers/loginController");
const auth = require("../middleware/authtoken");

router.post("/" , user.loginUser);
router.post('/forgot',user.forgotPass);
module.exports = router;
