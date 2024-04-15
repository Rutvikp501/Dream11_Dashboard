const mongoose = require('mongoose');
 //const DB_URL="mongodb://0.0.0.0:27017/";
const DB_URL="mongodb+srv://rutvikgainn:Dream11_Dashboard@ipl11.0m0z4yx.mongodb.net/?retryWrites=true&w=majority&appName=IPL11";
//const DB_name="IPL11";

const connectDB = async () => {
    mongoose.set('strictQuery', false)

    try {
        await mongoose.connect(`${DB_URL}`,);
        console.log(`Connected to MongoDB `);
    } catch (error) {
        console.error("Unable to connect to MongoDB:", error);
    }
};


module.exports = connectDB;