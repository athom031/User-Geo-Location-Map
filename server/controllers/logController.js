const mongoose = require('mongoose');
const User     = mongoose.model('User');
const _        = require('lodash'); //allows to limit user info return from db
const passport = require('passport'); //login passport library

module.exports.authenticate = (req, res, next) => { //post route function to send credentials for authentication
    passport.authenticate('local', (err, user, info) => { //calls arrow function in passport config
        if(err) 
            return res.status(400).json(err); // passport middleware error
        else if(user) 
            return res.status(200).json({ "token" : user.generateJwt() }); //registered user
        else 
            return res.status(404).json(info); //unkown user or incorrect password entered 
    })(req, res);
}
    
module.exports.userProfile = (req, res, next) => {
    User.findOne({_id: req._id}, 
      (err, user) => {
          if(!user) 
            return res.status(404).json({ status: false, message: 'User record not found'});
          else
            return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'userName', 'address']) });
      }  
    );
} 

module.exports.signin = (req, res, next) => {
    User.updateOne({userName: req.body.userName}, { $set: {online: true} }, function(err, response) {
        if(err)
            return res.status(400).json({ status: false, message: 'ERROR: Signin Error'});
        else if(response.n === 0)
            return res.status(404).json({ status: false, message: 'ERROR: User not found' });
        else 
            return res.status(200).json({ status: true, message: `${req.body.userName} is now online` });
    });
}


module.exports.signoff = (req, res, next) => {
    User.updateOne({userName: req.body.userName}, { $set: {online: false} }, function(err, response) {
        if(err)
            return res.status(400).json({ status: false, message: 'ERROR: Signoff Error'});
        else if(response.n === 0)
            return res.status(404).json({ status: false, message: 'ERROR: User not found' });
        else 
            return res.status(200).json({ status: true, message: `${req.body.userName} is now offline` });
    });
}
