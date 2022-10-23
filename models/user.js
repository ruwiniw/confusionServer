var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }, 
    // password: {
    //     type: String,
    //     default: false
    // }, 
    admin: {
        type: Boolean,
        default: false
    }
});

//used username and hashed password
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);