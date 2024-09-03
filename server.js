const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/db');
require('dotenv').config();
const authRoute = require('./Routes/authRoutes');
const errorHandler = require('./Middlewares/errorMiddleware');

// REST object
const app = express(); 

// connect DB
connectDB()

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(errorHandler)

// API Routes
app.use('./app/v1/auth' , authRoute);

// listen server

const PORT = process.env.Port

app.listen(PORT,(req,res)=>{
    console.log("server is running");
    
})