const mongoose       = require('mongoose');
const User           = mongoose.model('User');

const fetch          = require('node-fetch');
const { getCountry } = require('./../services/loc-service');

module.exports = {
register: async (req, res, next) => {

    var user = new User();

    user.fullName = req.body.fullName;
    user.userName = req.body.userName; 
    user.address = req.body.address; //will be changed (google API formatted address)
    user.password = req.body.password; //will encrypt password 
    user.online = false;
    //user.latCoord to be assigned
    //user.lngCoord to be assigned
    //user.saltSecret to be assigned  //encryption key
    
    let data;
    try {
        data = await getCountry(user.address);
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

    
    //get country field to check if in US (not always in same place (ie: apartment vs home))
    data.results[0].address_components.forEach(elem => {
        if(elem.types[0] === 'country') {
            country = elem.long_name;
        }
    });
            
    user.address = data.results[0].formatted_address;

    user.latCoord = data.results[0].geometry.location.lat;
    user.lngCoord = data.results[0].geometry.location.lng;
        
    if(country != 'United States') {
        res.status(422).send(['ERROR: Address must be in the U.S.']);
    }
    else if(req.body.password != req.body.confPassword) {
        res.status(422).send(['ERROR: Typed passwords do not match']);
    }
    else {
        user.save((err, doc) => {
            if(!err) { 
                res.send(doc);
            }
            else {
                if(err.code === 11000) 
                    res.status(422).send(['ERROR: Duplicate username found.']);
                else     
                    return next(err);
            }
        });
    }
}
};