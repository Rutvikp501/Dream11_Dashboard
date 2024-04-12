const mongoose = require('mongoose')
const DB_Connect= require('../config/db')

const UserSchema = new mongoose.Schema({
    User_ID:{type:String, required: true, unique: true},
    user_name: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    email_id: { type: String, },
    dob: { type: String, },
    friends:{type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: []},
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
})
const UserModel = DB_Connect.DB_Conn.model('user',UserSchema);
module.exports= UserModel;