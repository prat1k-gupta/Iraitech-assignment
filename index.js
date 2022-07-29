const express = require("express");
const connectDB = require("./connectDB");
const cookieParser = require("cookie-parser")
require("dotenv").config(); 
const userRoutes = require("./routes/userRoute")

const app = express(); 
const PORT = process.env.PORT; 
app.use(express.json())
app.use(cookieParser())

app.use(require("./routes/Auth"))
app.use('/user',userRoutes)
app.use(require("./routes/publicRoute"))

connectDB();
app.listen(PORT,(req,res)=>{
    console.log("server is running!!")
})