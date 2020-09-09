const API = require('./API');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const { getCountry } = require('./server/services/loc-service');

let data;

getCountry('43454 Bryant St Fremont, CA')
        .then((message) => {
            data = message;
            //console.log(data);
        })
        .catch((message) => {
            data = message;
            //console.log(data);
        });


console.log(data);
