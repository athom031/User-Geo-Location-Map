//mongoose model
const mongoose = require('mongoose'); 

//encrypt password
const bcrypt = require('bcryptjs');

//tokenize user data
const jwt = require('jsonwebtoken');  

var userSchema = new mongoose.Schema({
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

userSchema.path('password').validate((val) => {
    return (val.toLowerCase() === val || /^[a-zA-Z]+$/.test(val)) ? false : true;
}, 'Password must have atleast 1 uppercase letter and 1 non-letter');

//pre-event from bcrypt - encrypt password in db
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });    
});
 
userSchema.methods.verifyPassword = function(password) {
     return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id}, 
        process.env.JWT_SECRET, 
        {
           expiresIn: process.env.JWT_EXP 
        });
}

const UserData = mongoose.model('User', userSchema);

module.exports = UserData;