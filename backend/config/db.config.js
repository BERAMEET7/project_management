const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("connected to mongodb"));
};

module.exports = connectDB;