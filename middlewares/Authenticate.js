const user = require('../models/userSchema')
const jwt = require("jsonwebtoken")

const authenticate =async (req,res,next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = await jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyToken)
        const rootUser = await user.findOne({_id: verifyToken._id})
        
        if(!rootUser){
            return res.json({error: "user not found"})
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch(err){ 
        res.status(401).send('unauthorized: no token provided')
    }

}

module.exports = authenticate