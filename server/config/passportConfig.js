//configurate the passport and use local passport strategy

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User'); //we interact with our mongo db 

passport.use(
    new localStrategy({ usernameField: 'userName' }, //the unique key to search db for 
        (username, password, done) => { //function called to authenticate password
            User.findOne({ userName: username }, //find the user model that has the unique userName entered
                (err, user) => { // either returns err or the user found 
                    if(err) 
                        return done(err); // error case
                    else if(!user)
                        return done(null, false, { message: 'User is not registered' }); // unknown user
                    else if(!user.verifyPassword(password)) 
                        return done(null, false, { message: 'Password is incorrect.' }); // user found but password passed is incorrect
                    else 
                        return done(null, user); // successful authentication
                });
        })
);