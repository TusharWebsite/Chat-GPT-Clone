const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI)
        console.log("Mongo db is connected");
        
    } catch (error) {
    console.log(`Mongo connection error ${error}`);
        
    }
}

module.exports = connectDB;