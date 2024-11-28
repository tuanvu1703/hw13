const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect db success");
    } catch(error){
        console.log("connect db fail: ", error.message);
    }
}

module.exports = connectDB;