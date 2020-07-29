const fetch = require('node-fetch');

const getData = async () => {
    let url = 'http://localhost:3000/api/data';
    try {
        const response = await fetch(url);
        if(response.ok) {
            const jsonResponse = await response.json();
            let arr = [];
            
            for(let i in jsonResponse) {
                arr.push([jsonResponse[i].fullName, 
                          jsonResponse[i].latCoord, 
                          jsonResponse[i].lngCoord]);
            }
            
            return arr;
        }
        throw new Error('Request failed!');
    } catch(error) {
        console.log(error);
    }  
}

export default getData;