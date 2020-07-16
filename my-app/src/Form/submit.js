import React from 'react';

function submitHelper(data) {
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/register';
    //header('Access-Control-Allow-Origin: *');

    
    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText);
        }
    };
    
    xhr.send(data);
    //console.log(data);
        //new User(this.state.fullName, this.state.userName, this.state.address, this.state.);
    //console.log(user);
        //`Full Name: ${this.state.fullName}\nUsername: ${this.state.userName}\nAddress: ${this.state.address}\nPassword: ${this.state.password}\nConf Password: ${this.state.confPassword}\n`);
}

export default submitHelper;