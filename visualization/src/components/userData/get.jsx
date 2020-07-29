const fetch = require('node-fetch');

const getData = async () => {
    let url = 'http://localhost:3000/api/data';
    try {
        const response = await fetch(url);
        if(response.ok) {
            const jsonResponse = await response.json();
            let arr = [];
            
            for(let i in jsonResponse) {
                arr.push({
                          fullName: jsonResponse[i].fullName,
                          userName: jsonResponse[i].userName,
                          latCoord: jsonResponse[i].latCoord,
                          lngCoord: jsonResponse[i].lngCoord,
                          online:   jsonResponse[i].online 
                });
            }
            
            return arr;
        }
        throw new Error('Request failed!');
    } catch(error) {
        console.log(error);
    }  
}

export default getData;