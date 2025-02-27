const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Name must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Name must be at least 3 characters long"],
        }
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        minlength:[13,"Email must be at least 13 characters long"],
        isEmail:true,
    },
    password:
    {
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters long"],
        select:false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:
    {
        color:
        {
            type:String,
            required:true,
            minlength:[3,"Color must be at least 3 characters long"],
        },
        Plate:
        {
            type:String,
            required:true,
            minlength:[10,"Number plate cannot be less than 10 characters long"],
        },
        capacity:
        {
            type:Number,
            required:true,
            minlength:[1,"capacity must be atleast 1"],
        },
        vehicleType:
        {
            type:String,
            required:true,
            enum: ['Car', 'Motorcycle', 'Auto'],
        }
    },
    location:
    {
        lat:
        {
            type: Number,
        },
        long:
        {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = JWT.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
    return token;
}
captainSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel=mongoose.model("Captain",captainSchema);
module.exports=captainModel;