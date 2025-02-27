const userModel=require('../DB-Model/userModels');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blacklistToken = require('../DB-Model/blacklistToken');
const captainModel=require('../DB-Model/captain.model');

module.exports.authUser=async(req,res,next)=>
{
    const token =req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];
    if(!token)
    {
        return res.status(401).json({error:"Unauthorized"});
    }
    const isBlacklisted= await BlacklistToken.findOne({token});
    if(isBlacklisted)
    {
        return res.status(401).json({error:"Unauthorized"});
    }

    try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded._id);
     
    req.user=user;
    return next();
    }
    catch(err)
    {
        res.status(401).json({error:"Unauthorized"});
    }

}

module.exports.authCaptain=async(req,res,next)=>
{
    const token =req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];
    if(!token)
    {
        return res.status(401).json({error:"Unauthorized"});
    }
    const isBlacklisted= await blacklistToken.findOne({token});
    if(isBlacklisted)
    {
        return res.status(401).json({error:"Unauthorized"});
    }

    try{    
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    const captain = await captainModel.findById(decoded._id);
    req.captain=captain;
    return next();
    }
    catch(err)
    {
        res.status(401).json({error:"Unauthorized"});
    }

}