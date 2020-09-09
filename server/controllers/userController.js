const mongoose       = require('mongoose');
const User           = mongoose.model('User');

const { getCountry } = require('./../services/loc-service');

//mongo db data point
module.exports = {
register: async (req, res, next) => {
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
    
    getCountry(user.address)
        .then((message) => {
            let data = JSON.parse(message);

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
                        //username is set to unique, check for existing username in database
                        if(err.code === 11000) 
                            res.status(422).send(['ERROR: Duplicate username found.']);
                        else     
                            return next(err); //if this isn't the error return the other errors
                    }
                });
            }
        })
        .catch((message) => {
            console.log(message);
            res.status(422).send(['ERROR: Server Error, please check Backend']);
        });
}
};