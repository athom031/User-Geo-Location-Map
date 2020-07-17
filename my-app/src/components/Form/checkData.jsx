//const axios = require('axios').default;

function checkData(d) {
    let check = true;

    let data = JSON.parse(d);
    
    //things to check
        //1) password matches confPassword
        //2) password constraints
        
    //1) password matches confPassword
    if(data.password !== data.confPassword) {
        check = false;
        alert('Typed passwords do not match');
    }
    //2) password constraints check
    else if (data.password.toLowerCase() === data.password || /^[a-zA-Z]+$/.test(data.password) || data.password.length < 6) {
        check = false;
        alert('Password must have a minimum of 6 characters with atleast 1 uppercase letter and 1 non-letter');
    }
    return check;
}

export default checkData;
