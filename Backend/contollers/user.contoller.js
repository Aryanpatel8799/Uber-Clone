const userModel=require('../DB-Model/userModels');
const userService=require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser=async(req,res,next)=>
{
   const error = validationResult(req);
   if(!error.isEmpty())
   {
    return res.status(400).json({errors:error.array()});
   }

   console.log(req.body);
   

   const {fullname,email,password}=req.body;   
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

