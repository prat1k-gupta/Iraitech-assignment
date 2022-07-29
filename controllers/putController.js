const user = require("../models/userSchema");
exports.editUser = async (req,res)=>{
    const {name,email,password,cpassword,pic} = req.body
    
    if(password!=cpassword){
        return res.status(404).json("confirm password is not same as password")
    }
    const User = await user.findOne({_id: req.userID})
    if(User){
        User.name = name || User.name
        User.email = email || User.email
        User.pic = pic || User.pic; 
    }
    if(password){
        User.password = password
        User.cpassword = cpassword
    }
    const updateUser = await User.save(); 

    res.json(updateUser)
}