const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/Map.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../DB-Model/ride.model');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination, vehicleType } = req.body;
    console.log(req.user._id);
    
    try {
        const ride = await rideService.CreateRide(req.user._id,vehicleType, origin, destination);
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(origin);
        console.log("pickupCoordinates",pickupCoordinates);
        
        
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);
        console.log(captainsInRadius);
        
        ride.otp="";

        const rideWithUser = await rideModel.findOne(ride._id).populate('user');
        
         captainsInRadius.map(async (captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        });
       
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const fares = await rideService.getFare(origin, destination);
        res.status(200).json(fares);
    } catch (error) {
        next(error);
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide( rideId,req.captain._id );
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: {ride}
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}