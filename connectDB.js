const mongoose = require('mongoose')
require('dotenv').config();

const DB = process.env.DB_URL;
const connectDB = async ()=>{
    try{
        const conn  = await mongoose.connect(DB,{
                useNewUrlParser: true, 
                useUnifiedTopology: true 
        })
        if(conn){
            console.log("database connected")
        }
    }catch(err){
        console.log("db connection failed")
    }
}
module.exports = connectDB; 