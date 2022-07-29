const express = require('express')
const { getUser, getAllUsers } = require("../controllers/getContollers");
const { editUser } = require("../controllers/putController");
const authenticate = require("../middlewares/Authenticate");
const router = express.Router();

router.route('/').get(authenticate, getUser)
router.route('/profile').put(authenticate,editUser)


module.exports = router