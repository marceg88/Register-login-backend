const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type: String, uppercase: true, required: true },
    lastName: { type: String, uppercase: true, required: true },
    userName: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    age: { type: Number },
    address: { type: String },
    contact: { type: Number },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema)