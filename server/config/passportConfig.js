//configurate the passport and use local passport strategy
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    //the unique key to search db for 
    new localStrategy({ usernameField: 'userName' }, 
        //function called to authenticate password
        (username, password, done) => { 
            //find the user model that has the unique userName entered
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