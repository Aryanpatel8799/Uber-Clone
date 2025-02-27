const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController=require('../contollers/user.contoller');
const authMiddleware=require('../middleware/auth.middleware');


router.post('/register',[
    body('fullname.firstname').trim().isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body('email').isEmail(),body('password').trim().isLength({min:8}),
    body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
],userController.registerUser);
   
router.post('/login',
    [
        body('email').isEmail().isLength({min:13}).withMessage("Email must be at least 13 characters long"),
        body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    ],
    userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.UserProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser);


module.exports=router;