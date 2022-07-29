const express = require("express")
const router = express.Router(); 
const userData = require('../models/userSchema')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { userSignIn, userSignUp } = require("../controllers/postControllers");

//signup
router.post('/signup',userSignUp)
//signin router 
router.post("/signin",userSignIn)


module.exports = router; 
