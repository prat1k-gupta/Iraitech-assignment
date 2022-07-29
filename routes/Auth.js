const express = require("express")
const router = express.Router(); 
const userData = require('../models/userSchema')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const authenticate = require("../middleware/authenticate")

//signup
router.post('/signup',async (req,res)=>{
    const {name,email,password,cpassword,pic} = req.body; 
    if(!name||!email||!password||!cpassword){
        return res.status(422).json({error: "please enter the required field"})
    }
    if(password != cpassword){
        return res.status(422).json({error: "password does not match"})
    }
    const userExist = await userData.findOne({email: email}); 
    if(userExist){
        return res.status(422).json({error: "user already exist"})
    }
    const User = new userData({name,email,password,cpassword,pic});
    try{
        const saveUser = await User.save();
        if(saveUser){
            return res.status(201).json({message: "user registered successfully"}); 
        }else console.log("user not saved")

    }catch(err){
        console.log(err); 
    }
})

//signin router 

router.post("/signin",async (req,res)=>{
    const {email, password} = req.body; 

    if(!email || !password){
        return res.status(404).json({error: "Please enter required fields"})
    }
    
    const regUser = await userData.findOne({email: email}); 
    if(!regUser){
        return res.status(404).json({error: "user doesn't exist"})
    }
    
    const isCorrect = await bcrypt.compare(password,regUser.password);
    if(!isCorrect){
        return res.status(422).json({error: "invalid credentials"})
    }
    
    const token =  await regUser.generateAuthToken(); 

    res.cookie("jwtoken",token,{
        expires: new Date(Date.now()+25892000000),
        httpOnly: true
    })

    res.status(200).json({message: "login succesfull"})
})


module.exports = router; 
