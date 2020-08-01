const mongoose = require('mongoose');
const fetch    = require('node-fetch');
//ES8 have to install async and import fetch

const bcrypt = require('bcryptjs');
//needed to encrypt password and keep secret in database

const passport = require('passport'); //login passport library

const _ = require('lodash'); //allows to limit user info return from db

const User = mongoose.model('User');

const API = require('../../API');
//load up API KEY

//http request geocode data using ES8 promise implementation (async/await + fetch)
async function getCountry(loc) {
    //EXAMPLE API REQUEST
        //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    let geoUrlBase = 'https://maps.googleapis.com/maps/api/geocode/json'
    let locUpdate = loc.split(' ').join('+');
    let url = `${geoUrlBase}?address=${locUpdate}&key=${API}`;

    try {
        const response = await fetch(url);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        throw new Error('Request Failed!');
    } catch(err) {
        console.log(err);
        return 'err';
    }
}

//mongo db data point
module.exports.register = async (req, res, next) => {
    //will get promise need to wait till promise is resolved

    var user = new User();
    //create a user type

    //assign user values
    user.fullName = req.body.fullName;
    user.userName = req.body.userName; 
    user.address = req.body.address; //will be changed to formatted
    user.password = req.body.password; //will be changed
    user.online = false;

    //user.latCoord to be assigned
    //user.lngCoord to be assigned
    //user.saltSecret to be assigned 
    
    let data = await getCountry(user.address);
    //call async function and only continue until returned promise is resolved

    if(data === 'err' || data.status != 'OK' || data.results[0].address_components.length < 7) {
        // many things tested here: 
            //incase there is error in promise
            //search gets no results
            //search results is too general
        res.status(422).send(['ERROR: Address Format Incorrect, ie: not specific enough']);
    }
    else {
        let country = '';
        data.results[0].address_components.forEach(elem => {
            if(elem.types[0] === 'country') {
                country = elem.long_name;
            }
        });
        //get country field to check if in US (not always in same place (ie: apartment vs home))
                
        //set user location data
        user.address = data.results[0].formatted_address;

        user.latCoord = data.results[0].geometry.location.lat;
        user.lngCoord = data.results[0].geometry.location.lng;
            
        if(country != 'United States') {
            res.status(422).send(['ERROR: Address must be in the U.S.']); //address check
        }
        else if(req.body.password != req.body.confPassword) {
            res.status(422).send(['ERROR: Typed passwords do not match']); //conf password check
        }
        else {
            //still have the fourth param -> encrypted password
            user.save((err, doc) => {
                if(!err) { 
                    res.send(doc);
                }
                else {
                    //username is set to unique, check for existing username in database
                    if(err.code === 11000) 
                        res.status(422).send(['ERROR: Duplicate username found.']);
                    else     
                        return next(err); //if this isn't the error return the other errors
                }
            });
        }
    }
}

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

module.exports.signoff =  (req, res, next) => {
    User.updateOne({userName: req.body.userName}, { $set: {online: false} }, function(err, response) {
        if(err)
            return res.status(400).json({ status: false, message: 'ERROR: Signoff Error'});
        else if(response.n === 0)
            return res.status(404).json({ status: false, message: 'ERROR: User not found' });
        else 
            return res.status(200).json({ status: true, message: `${req.body.userName} is now offline` });
    });
}

module.exports.changeName = (req, res, next) => {
    User.updateOne({userName: req.body.userName}, { $set: {fullName: req.body.fullName} }, function(err, response) {
        if(err)
            return res.status(400).json({ status: false, message: 'ERROR: Name Change Error'});
        else if(response.n === 0)
            return res.status(404).json({ status: false, message: 'ERROR: User not found' });
        else 
            return res.status(200).json({ status: true, message: `${req.body.userName}'s name is now ${req.body.fullName}` });
    });
}

module.exports.changePassword = (req, res, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            let password = hash;
            let saltS = salt;
            User.updateOne({userName: req.body.userName}, { $set: {password: password, saltSecret: saltS} }, function(err, response) {
                if(err)
                    return res.status(400).json({ status: false, message: 'ERROR: Password Change Error'});
                else if(response.n === 0)
                    return res.status(404).json({ status: false, message: 'ERROR: User not found' });
                else 
                    return res.status(200).json({ status: true, message: `${req.body.userName}'s password has changed` });
            });
        });
    }); 
}

module.exports.changeAddress= async (req, res, next) => {

    let data = await getCountry(req.body.address);
    //call async function and only continue until returned promise is resolved

    if(data === 'err' || data.status != 'OK' || data.results[0].address_components.length < 7) {
        // many things tested here: 
            //incase there is error in promise
            //search gets no results
            //search results is too general
        return res.status(422).json({ status: false, message: 'ERROR: Address Format Incorrect, ie: not specific enough' });
    }
    else {
        let country = '';
        data.results[0].address_components.forEach(elem => {
            if(elem.types[0] === 'country') {
                country = elem.long_name;
            }
        });
        //get country field to check if in US (not always in same place (ie: apartment vs home))
                
        //set user location data
        let address = data.results[0].formatted_address;

        let latCoord = data.results[0].geometry.location.lat;
        let lngCoord = data.results[0].geometry.location.lng;
            
        if(country != 'United States') {
            return res.status(422).json({ status: false, message: 'ERROR: Address must be in the U.S.' }); //address check
        }   
        
        User.updateOne({userName: req.body.userName}, { $set: { address: address, latCoord: latCoord, lngCoord: lngCoord } }, function(err, response) {
                if(err)
                    return res.status(400).json({ status: false, message: 'ERROR: Address Change Error'});
                else if(response.n === 0)
                    return res.status(404).json({ status: false, message: 'ERROR: User not found' });
                else 
                    return res.status(200).json({ status: true, message: `${req.body.userName}'s address has changed` });
        });
    } 
}