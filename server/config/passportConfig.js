//configurate the passport and use local passport strategy
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'userName' }, 
        (username, password, done) => { 
            User.findOne({ userName: username },
                (err, user) => { 
                    if(err) 
                        //error on db, db not searched
                        return done(err); 
                    else if(!user)
                        //db is searched but user is not found
                        return done(null, false, { message: 'ERROR: User is not registered' }); 
                    else if(!user.verifyPassword(password)) 
                        //user is found but the password does not match
                        return done(null, false, { message: 'ERROR: Password is incorrect.' }); // user found but password passed is incorrect
                    else 
                        return done(null, user);
                });
        })
);