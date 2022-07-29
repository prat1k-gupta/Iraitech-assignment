const user = require("../models/userSchema");
exports.getUser = (req,res)=>{
    res.json(req.rootUser)
}


exports.getAllUsers = async (req,res)=>{
    const allUsers= await user.find({})
    res.json(allUsers)
}