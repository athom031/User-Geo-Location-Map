const mongoose = require('mongoose');

const axios = require('axios').default;

const User = mongoose.model('User');

const API = require('../../API');

function axiosTest(loc) {
    //axios Call to Geocode API
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address:loc,                                  //Passed in user.address
            key: API // IMPORTED API KEY (set if not set yet)
        }
    })
    .then(response => {
        return response.data //returns the promise from the axios call
    })
}

//mongo db data point
module.exports.register = (req, res, next) => {
    var user = new User();
    //create a user type

    //assign user values
    user.fullName = req.body.fullName;
    user.userName = req.body.userName; 
    user.address = req.body.address; //will be changed to formatted
    user.password = req.body.password; //will be changed
    user.confPassword = req.body.confPassword; //will be changed
    //user.latCoord to be assigned
    //user.lngCoord to be assigned
    //user.saltSecret to be assigned 

    axiosTest(user.address)
        .then(data => {
            //we access the promise call and get the value of it with another .then()
            if(data.status === 'ZERO_RESULTS' || data.results[0].address_components.length < 7) {
                //user puts in something like 'a'
                res.status(422).send(['ERROR: Address Format Incorrect, ie: not specific enough']);
            } else {
                let country = ' ';
                //get country field to check if in US 
                country = data.results[0].address_components[6].long_name
                console.log(country);

                //set user location data
                user.address = data.results[0].formatted_address;

                user.latCoord = data.results[0].geometry.location.lat;
                user.lngCoord = data.results[0].geometry.location.lng;
            
                if(country != 'United States') {
                    res.status(422).send(['ERROR: Address must be in the U.S.']); //address check
                }
                else {
                    if(user.password != user.confPassword) {
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
        })
        .catch(err => console.log(err))
}
