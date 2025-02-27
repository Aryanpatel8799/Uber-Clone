const userModel=require('../DB-Model/userModels');
const userService=require('../services/user.services');
const { validationResult } = require('express-validator');
const blacklisttokenModel=require('../DB-Model/blacklistToken');

module.exports.registerUser=async(req,res,next)=>
{
   const error = validationResult(req);
   if(!error.isEmpty())
   {
    return res.status(400).json({errors:error.array()});
   }

   const {fullname,email,password}=req.body;
   const isUserExist=await userModel.findOne({email});
   if(isUserExist)
   {
       return res.status(400).json({error:"User already exist"});
   }   
   
   const hashPassword=await userModel.hashPassword(password);
   const user=await userService.CreateUser(
    {
       firstname:fullname.firstname,
       lastname:fullname.lastname,
       email,
       password:hashPassword
    })
    const token=user.generateAuthToken();
    res.status(201).json({user,token});

}

module.exports.loginUser=async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        res.status(400).json({error:error.array()});
    }

    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');
    if(!user)
    {
        return res.status(401).json({error:"Invalid email or password"});
    }
    const isMatched = await user.comparePassword(password);
    if(!isMatched)
    {
        res.status(401).json({error:"Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});

}

module.exports.UserProfile=async(req,res)=>{

    res.status(200).json(req.user);
}

module.exports.logoutUser=async(req,res)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    await blacklisttokenModel.create({token});
    res.status(200).json({message:"Logout Successfully"});
}