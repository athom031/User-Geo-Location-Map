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
        required: 'Name is required.'
    },
    userName: {
        type: String,
        required: 'Username is required.',
        unique: true
    },
    address: {
        type: String,
        required: 'Address is required. Must be US.'
    },
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
    saltSecret: String
});


//validation for password
userSchema.path('password').validate((val) => {
    if(val.length < 6 || val.toLowerCase() === val) {
        return false;
    }
    else {
        //console.log(val);
        return true;
    }
}, 'Password must be min 6 characters and have atleast 1 uppercase letter and 1 non-letter');

/*
userSchema.path('confPassword').validate((val) => {
    console.log(this.password);
    console.log(this.confPasword);
    return true;
    
    let pass = ' ';
    userSchema.path('password').validate((val) => {
        pass = val;
        console.log("hope this works")
        console.log(val)
        return true;
    });
    console.log("test:")
    console.log(pass);

    if(true){
        return false;
    }
    else {
        return true;
    }

}, 'Typed Passwords do not match');
*/

//preevent from bcrypt
//invoked before save operation and generates saltSecretet in User
userSchema.pre('save', function (next) {
    //to check if passwords match
    //will only work when passwords assigned 
        //need to be in the invoke before save operation
    userSchema.path('confPassword').validate((val) => {
        if(this.password != this.confPassword) {
            return false;
        }
        else {
            return true;
        }
    }, 'Typed Passwords do not match');

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            //console.log(this.password);
            //console.log(this.confPassword);
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);
