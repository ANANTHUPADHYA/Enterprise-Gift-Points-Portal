var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    yoyoPoints: {
        type: Number,
        default: 1000
    }
});

User.plugin(passportLocalMongoose, { usernameField : 'email'});

module.exports = mongoose.model('User', User);