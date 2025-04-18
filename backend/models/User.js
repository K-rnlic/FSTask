const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    dateOfBirth:{
        type: Date,
        required: true
    },

    zipCode:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    TimeStamp:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('web_user', UserSchema);
User.createIndexes();

module.exports = User;