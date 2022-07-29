const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true
        },
        email: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        cpassword:{
            type: String,
            required: true
        },
        token :{
            type: String,
        }
    }
)

userSchema.pre('save',async function (){
    if(this.isModified("password")){
        const hashPassword = await bcrypt.hashSync(this.password, 12);
        const chashPassword = await bcrypt.hashSync(this.cpassword, 12);
        this.password = hashPassword;
        this.cpassword = chashPassword; 
    }
})

userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY); 
        this.token = token
        await this.save();
        return token; 
    }catch(err){
        console.log(err); 
    }  
}

const user = mongoose.model("user",userSchema)

module.exports = user; 