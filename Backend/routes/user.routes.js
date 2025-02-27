const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController=require('../contollers/user.contoller');

router.post('/register',[
    body('fullname.firstname').trim().isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body('email').isEmail(),body('password').trim().isLength({min:8}),
    body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
],userController.registerUser);
     

module.exports=router;