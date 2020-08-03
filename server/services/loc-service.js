const fetch = require('node-fetch');

const API = require('../../API');

//http request geocode data using ES8 promise implementation (async/await + fetch)
const getCountry = async (loc) => {
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

module.exports = { 
    getCountry
}