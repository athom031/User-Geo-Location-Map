//create mongoose model for users data in mongo db
const mongoose = require('mongoose'); 

//needed to encrypt password and keep secret in database
const bcrypt = require('bcryptjs');

//JSON web token for user
const jwt = require('jsonwebtoken');  

var userSchema = new mongoose.Schema({
    //none are optional -> data must be inputed
    fullName: {
        //Name doesn't have to follow any convention (first name/last name etc)
        type: String,
        required: 'Name is required.'
    },
    userName: {
        //should be unique, people can have same name/address/password
        type: String,
        required: 'Username is required.',
        unique: true
    },
    //will be altered when stored in database
    address: {
        type: String,
        required: 'Address is required. Must be US.' 
    },
    password: {
        type: String,
        required: "Password is required.",
        minlength : [6, "Password must be atleast 6 characters long"]
    },
    online: Boolean, //set to false

    // not assigned in client side
    saltSecret: String,
    latCoord: Number,
    lngCoord: Number
});


//validation for password specifications other than minLength
userSchema.path('password').validate((val) => {
    return (val.toLowerCase() === val || /^[a-zA-Z]+$/.test(val)) ? false : true;
}, 'Password must have atleast 1 uppercase letter and 1 non-letter');

//pre-event from bcrypt - invoked before save operation and generates saltSecretet in User
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });    
});
 
//methods for login authentication used in passport config
userSchema.methods.verifyPassword = function(password) {
     //bcrypt function to compare db encrypted password with typed base password
     return bcrypt.compareSync(password, this.password); //returns boolean
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id}, //pass information for payload (id is part of mongodb deafult info)
        process.env.JWT_SECRET, //secret code defined in json config
        {
           expiresIn: process.env.JWT_EXP  //passes '2m' string to define expire time
        });
}

//created 'User' mongoose model
const UserData = mongoose.model('User', userSchema);

module.exports = UserData;