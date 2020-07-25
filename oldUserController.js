const mongoose = require('mongoose');
const fetch = require('node-fetch');

const axios = require('axios').default;
//promise based http client for browser/node.js;

const User = mongoose.model('User');

const API = require('../../API');

/*
function axiosTest(loc) {
    //axios Call to Geocode API
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address:loc, //Passed in user.address
            key: API // IMPORTED API KEY (set if not set yet)
        }
    })
    .then(response => {
        return response.data //returns the promise from the axios call
    })
} */

//async await test
async function getCountry(loc) {
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
    } catch(err) {
        return 'err';
    }
}

//mongo db data point
module.exports.register = async (req, res, next) => {
    var user = new User();
    //create a user type

    //assign user values
    user.fullName = req.body.fullName;
    user.userName = req.body.userName; 
    user.address = req.body.address; //will be changed to formatted
    user.password = req.body.password; //will be changed
    //user.latCoord to be assigned
    //user.lngCoord to be assigned
    //user.saltSecret to be assigned 
    let data = await getCountry(user.address);
    console.log(data);
    if(data === 'err' || typeof data === 'undefined' || data.status === 'ZERO_RESULTS' || data.results[0].address_components.length < 7) {
        //user puts in something like 'a' (which could be anything) or 'asklfasghals' which gets no result
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
    /*
    axiosTest(user.address)
        .then(data => {
             else {
                let country = '';
                data.results[0].address_components.forEach(elem => {
                    if(elem.types[0] === 'country') {
                        country = elem.long_name;
                    }
                });
                //get country field to check if in US 
                
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
        })
        .catch(err => console.log(err))
        
}
*/