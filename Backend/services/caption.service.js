const captainModel=require('../DB-Model/captain.model');

module.exports.createCaptain=async({
firstname,lastname,email,password,color,Plate,capacity,vehicleType
})=>
{
    if(!firstname || !email || !password || !color || !Plate || !capacity || !vehicleType)
    {
        throw new Error('All fields are required');
    }
    

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            Plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}