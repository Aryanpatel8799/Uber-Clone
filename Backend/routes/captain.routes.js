const express = require('express');
const router = express.Router();
const { body } =require('express-validator');
const captainController=require('../contollers/captain.contoller');
const authMiddleware=require('../middleware/auth.middleware');


router.post('/register',[
    body('fullname.firstname').trim().isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body('email').isEmail().isLength({min:13}).withMessage("Email must be at least 13 characters long"),
    body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body('vehicle.Plate').trim().isLength({min:3}).withMessage("Number plate cannot be less than 3 characters long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['Car','Motorcycle','Auto']).withMessage("Vehicle type must be Car, Motorcycle or Auto"),

],captainController.registerCaptain);

router.post('/login',[    
    body('email').isEmail().isLength({min:13}).withMessage("Email must be at least 13 characters long"),
    body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
],captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports = router;