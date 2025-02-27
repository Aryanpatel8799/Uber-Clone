const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors');
const express = require('express');
const app = express();
const userRoutes=require('./routes/user.routes');
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cors());
const connectDB=require('./DB/db');
connectDB();

app.get('/',(req,res)=>
{
    res.send("Hello World");
})
app.use('/user',userRoutes);

module.exports = app;