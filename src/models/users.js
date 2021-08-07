const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
    },
    isSubscribed: {
        type: String,
        default: 'none'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    borrowedBooks: [
        {}
    ],

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
