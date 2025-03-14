const axios = require('axios');
const captainModel = require('../DB-Model/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            console.log(location);
            
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Unable to fetch coordinates: ${response.data.error_message}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    console.log("origin, destination",origin, destination);
    

    try {
        const originCoordinates = await this.getAddressCoordinate(origin);
        const destinationCoordinates = await this.getAddressCoordinate(destination);
        // console.log(originCoordinates);
        

        const apiKey = process.env.TIME_FINDING;
        const url = `https://api.nextbillion.io/distancematrix/json?origins=${originCoordinates.ltd},${originCoordinates.lng}&destinations=${destinationCoordinates.ltd},${destinationCoordinates.lng}&option=flexible&key=${apiKey}`;

        const response = await axios.get(url);
        if (response.data.status === 'Ok') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            const distanceTime = response.data.rows[0].elements[0];
            console.log(distanceTime);
            return distanceTime;
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports.getSuggestion = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }
    const apiKey = process.env.TIME_FINDING;
    const url = `https://api.nextbillion.io/autosuggest?q=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items) {
            return response.data.items;
        } else {
            return []; // Return an empty array if items is null
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd,lng,radius) =>{
   
    const captains=await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6378.1]
            }
        }

    })

    return captains
}



