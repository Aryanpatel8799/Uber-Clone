const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.DATABASE_URL).then(async ()=>
    {
       await console.log("Connected to DB");
    }).catch((err=>console.log(err)));
    
}

module.exports=connectDB;