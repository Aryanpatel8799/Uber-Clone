const captainModel=require('../DB-Model/captain.model');
const captainService=require('../services/caption.service');
const { validationResult } = require('express-validator');


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
   res.status(201).json({captain,token});
}