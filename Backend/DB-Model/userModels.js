const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Name must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Name must be at least 3 characters long"],
        }
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        minlength:[13,"Email must be at least 13 characters long"],
        isEmail:true,
    },
    password:
    {
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters long"],
        select:false,   
    },
    socketId:
    {
        type:String
    },
})

userSchema.methods.generateAuthToken=function()
{
    const token=JWT.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
    return token;
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User=mongoose.model("user",userSchema);
module.exports=User;