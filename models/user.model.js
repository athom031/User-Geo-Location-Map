const mongoose = require('mongoose');

/*
things to implement:
user data point->
Name done
Password done -> check length, capital letter/nonletter?
Take address and use geocoding api to check if it is a us address
*/

const bcrypt = require('bcryptjs');
//needed to encrypt password and keep secret in database 
var userSchema = new mongoose.Schema({
    //none are optional -> data must be inputted
    fullName: {
        //as of rn name doesn't have to follow any convention (first name/last name etc)
        type: String,
        required: 'Full name can\'t be empty'
    },
    //should probably have a username instead of email that needs to be unique
    email: {
        type: String,
        required: 'email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [8, "Password must be atleast 8 characters long"]
        //add needs atleast one capital letter?
    },
    saltSecret: String
});


//validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


//preevent from bcrypt
//invoked before save operation and generates saltSecretet in User
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);
