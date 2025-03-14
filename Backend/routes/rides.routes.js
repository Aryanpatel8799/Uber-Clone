const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const rideController = require('../contollers/ride.controllers');
const authMiddleware = require('../middleware/auth.middleware');
router.post('/create-ride',
    authMiddleware.authUser,
    [
        body('origin').isString().isLength({ min: 3 }),
        body('destination').isString().isLength({ min: 3 }),
        body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]),
    ],
    rideController.createRide
);
router.get('/get-fare',
    authMiddleware.authUser,
    [
        query('origin').isString().isLength({ min: 3 }),
        query('destination').isString().isLength({ min: 3 }),
    ],
    rideController.getFare
);
router.post('/confirm',
    authMiddleware.authCaptain,
    [
        body('rideId').isString().isLength({ min: 3 }),
    ],
    rideController.confirmRide
);
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)
router.post('/end-ride',
    authMiddleware.authCaptain,
    [
        body('rideId').isString().isLength({ min: 3 }),
    ],
    rideController.endRide
);




module.exports = router;