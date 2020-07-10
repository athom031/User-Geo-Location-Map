const mongoose = require('mongoose');

//create mongoose model for users data in mongo db

/*
TODO: password/confpassword
TODO: address US check
*/

const bcrypt = require('bcryptjs');
//needed to encrypt password and keep secret in database

var userSchema = new mongoose.Schema({
    //none are optional -> data must be inputed
    fullName: {
        //as of rn name doesn't have to follow any convention (first name/last name etc)
        type: String,
        required: 'Name is required.'
    },
    userName: {
        type: String,
        required: 'Username is required.',
        //should be unique, people can have same name/address/password
        unique: true
    },
    address: {
        type: String,
        required: 'Address is required. Must be US.'
        //TODO: eventually want a check for US ADDRESS
    },
    password: {
        type: String,
        required: "Password is required."
        //lets try validate method -> email
        //minlength : [8, "Password must be atleast 8 characters long"]
    },
    saltSecret: String, //not assigned in client side
    confPassword: {
        type:String,
        required: "Please confirm password"
    }
    //saltSec: String //not assigned on client side (potentially not needed why not just set same val after check)
});


//validation for password
userSchema.path('password').validate((val) => {
    if(val.length < 6 || val.toLowerCase() === val || /^[a-zA-Z]+$/.test(val)) {
        return false;
    }
    else {
        return true;
    }
}, 'Password must be min 6 characters and have atleast 1 uppercase letter and 1 non-letter');

//pre-event from bcrypt
//invoked before save operation and generates saltSecretet in User
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            //we're assuming here that password is same as confPassword
            this.password = hash;
            this.confPassword = hash;
            this.saltSecret = salt;
            next();
        });
    });    
});
       
//created 'User' mongoose model
mongoose.model('User', userSchema);
