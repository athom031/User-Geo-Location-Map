const mongoose = require('mongoose');

//create mongoose model for users data in mongo db

const axios = require('axios').default;
//promise based http client for browser/node.js

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
    //will be altered when stored in database to protect user privacy
    password: {
        type: String,
        required: "Password is required."
        //lets try validate method -> email
        //minlength : [8, "Password must be atleast 8 characters long"]
    },
    confPassword: {
        type:String,
        required: "Please confirm password"
    },
    // not assigned in client side
    saltSecret: String,
    latCoord: Number,
    lngCoord: Number
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
/*
userSchema.path('address').validate((val) => {
    let countryCheck = axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                                    params: {
                                        address:val,
                                        key:'AIzaSyBcbwAdfcOuIZMlYSs7Z5hlRV2Nn6jy2lE'
                                    }   
                            })
                            .then(function(response) {
                                return response['data']['results'][0]['address_components'][6]['long_name'];
                            })
                            .catch(function(err) {
                                return ' ';
                            });
    console.log(countryCheck);
    if(countryCheck === 'United States') {
        return true;
    }
    else {
        return false;
    }
}, 'Address must be in the U.S.');
*/
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
