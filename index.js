const express = require("express");
const connectDB = require("./connectDB");
const Authenticate = require("./middlewares/Authenticate")
const cookieParser = require("cookie-parser")
const user = require("./models/userSchema")
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

app.post("/user/profile",Authenticate,async (req,res)=>{

})
connectDB();
app.listen(PORT,(req,res)=>{
    console.log("server is running!!")
})