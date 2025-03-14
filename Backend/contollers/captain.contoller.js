const captainModel=require('../DB-Model/captain.model');
const captainService=require('../services/caption.service');
const { validationResult } = require('express-validator');
const blacklistToken=require('../DB-Model/blacklistToken');


module.exports.registerCaptain=async(req,res)=>
{
   const error=validationResult(req);
   if(!error.isEmpty())
   {
    return res.status(400).json({errors:error.array()});
   }
   const {fullname,email,password,vehicle}=req.body;

   const isCaptainExist=await captainModel.findOne({email});
   if(isCaptainExist)
   {
    return res.status(400).json({error:"Captain already exist"});
   }

   const hashPassword=await captainModel.hashpassword(password);
   
   const captain=await captainService.createCaptain({
       firstname:fullname.firstname,
       lastname:fullname.lastname,
       email,
       password:hashPassword,
       color:vehicle.color,
       Plate:vehicle.Plate,
       capacity:vehicle.capacity,
       vehicleType:vehicle.vehicleType
   })

   const token=captain.generateAuthToken();
   res.status(201).json({token,captain});
}

module.exports.loginCaptain=async(req,res)=>
{
    const error =validationResult(req);
    if(!error.isEmpty())
    {
        res.status(400).json({error:error.array()});
    }   

    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain)
    {
        return res.status(401).json({error:"Invalid email or password"});
    }
    const isMatched = await captain.comparePassword(password);
    if(!isMatched)
    {
        res.status(401).json({error:"Invalid email or password"});
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile=async(req,res)=>
{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain=async(req,res)=>
{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    await blacklistToken.create({token});
    res.status(200).json({message:"Logout Successfully"});
}   