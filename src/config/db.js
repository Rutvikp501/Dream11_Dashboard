const mongoose = require('mongoose');
const DB_URL="mongodb://0.0.0.0:27017/";
const DB_name="IPL11";

const connectDB = async () => {
    mongoose.set('strictQuery', false)

    try {
        await mongoose.connect(`${DB_URL}${DB_name}`,);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Unable to connect to MongoDB:", error);
    }
};


module.exports = connectDB;