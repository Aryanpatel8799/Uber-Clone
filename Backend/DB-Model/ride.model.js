const mongoose = require('mongoose');
const captain = require('./captain.model');
const { sign } = require('jsonwebtoken');

const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captain',
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        select:false,
        required:true
    },
    fare:{
        required:true,
        type:Number,
    },
    status:{
        type:String,
        enum:['pending','accepted','completed','cancelled','ongoing'],
        default:'pending'
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    }
})

module.exports = mongoose.model('Ride', rideSchema);