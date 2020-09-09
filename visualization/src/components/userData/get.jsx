import { get } from 'lodash';

const fetch = require('node-fetch');

//server side posts all of the mongo db nodes, and now request from the front end
const getData = () => {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:3000/api/data';

        var xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);

                let arr = [];
                
                for(let i in data) {
                    arr.push({
                            fullName: data[i].fullName,
                            userName: data[i].userName,
                            latCoord: data[i].latCoord,
                            lngCoord: data[i].lngCoord,
                            online:   data[i].online 
                    });
                }
                
                resolve(arr);
            }
            else if(xhr.readyState === 4) {
                reject('Request failed!');
            }
        }

        xhr.send();
    })
}

export default getData;