function signoffHelper(form, data) {
    //console.log(data);
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/signoff';
    //if don't have the http:// -> Access-Control-Allow-Origin error

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText) 
        }
        else if(xhr.readyState === 4) { 
            console.log(JSON.parse(this.responseText).message);
        }
    };
    
    xhr.send(data);
}

export default signoffHelper;