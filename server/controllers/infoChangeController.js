const mongoose       = require('mongoose');
const User           = mongoose.model('User');

const { getCountry } = require('../services/loc-service');

const fetch          = require('node-fetch');

const bcrypt         = require('bcryptjs');

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

module.exports.changeAddress = async (req, res, next) => {
    let data;
    try {
        data = await getCountry(req.body.address);
    } catch(err) {
        console.log(err);
        res.status(422).send(['ERROR: Server Error, please check Backend']);
    }

    if(data === 'err') res.status(422).send(['ERROR: Server Error, please check Backend']);
    
    data = JSON.parse(data);
    
    if(data.status != 'OK' || data.results[0].address_components.length < 7) {
        res.status(422).send(['ERROR: Address Format Incorrect, ie: not specific enough']);
    }

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
        return res.status(422).json({ status: false, message: 'ERROR: Address must be in the U.S.' }); 
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
