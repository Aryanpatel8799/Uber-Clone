const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors');
const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapsRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/rides.routes');
app.use(express.json());
app.use(cookiesParser());

app.use(express.urlencoded({extended:true}));
app.use(cors());
const connectDB=require('./DB/db');
connectDB();

app.get('/',(req,res)=>
{
    res.send("Hello World");
})
app.use('/user',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);
module.exports = app;