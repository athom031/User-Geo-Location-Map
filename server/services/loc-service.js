const API = require('../../API');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//http request geocode data using promise implementation
const getCountry = loc => {
    return new Promise((resolve, reject) => {
        //EXAMPLE API REQUEST
            //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
        let geoUrlBase = 'https://maps.googleapis.com/maps/api/geocode/json'
        let locUpdate = loc.split(' ').join('+');
        let url = `${geoUrlBase}?address=${locUpdate}&key=${API}`;
        
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
            else if(xhr.readyState === 4) {
                reject('err');
            }
        }

        xhr.send();
    });
}

module.exports = { 
    getCountry
}