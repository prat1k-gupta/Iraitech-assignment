const express = require("express");
const connectDB = require("./connectDB");
const Authenticate = require("./middlewares/Authenticate")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const user = require("./models/userSchema");
const { findOneAndUpdate } = require("./models/userSchema");
require("dotenv").config(); 

const app = express(); 
const PORT = process.env.PORT; 
app.use(express.json())
app.use(cookieParser())
app.use(require("./routes/Auth"))

app.get("/user",Authenticate,(req,res)=>{
    res.json(req.rootUser)
})

app.get("/list",async (req,res)=>{
    const allUsers= await user.find({})
    res.json(allUsers)
})

app.put("/user/profile",Authenticate,async (req,res)=>{
    const currentPassword = req.rootUser.password
    const {name,email,password,cpassword,pic} = req.body
    const isCorrect = await bcrypt.compare(password,currentPassword);
    if(!isCorrect){
        return res.status(422).json({error: "please enter the correct current password"})
    }
    if(password!=cpassword){
        return res.status(404).json("confirm password is not same as password")
    }
    const User = await user.findOneAndUpdate({_id: req.userID},{name,email,password,cpassword,pic},{new: true})
    res.json(User)

})
connectDB();
app.listen(PORT,(req,res)=>{
    console.log("server is running!!")
})