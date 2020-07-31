//mongodb://localhost:27017/MEANStackDB

function logHelper(form, data) {
    // we are sending confPassword to post, but not part of model
    
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/authenticate';
    //if don't have the http:// -> Access-Control-Allow-Origin error

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //console.log("Sending Data:")
            //console.log(this.responseText);
            form.setState({
                logSuccess: true 
            })
            console.log(this.responseText);
        }
        else if(xhr.readyState === 4) { 
            form.setState({
                error: JSON.parse(this.responseText).message
                // takes out [" "] so that it matches syntax of other errors
            });
            console.log(JSON.parse(this.responseText).message);
        }
    };
    
    xhr.send(data);
}

export default logHelper;

/*function submitHelper(form, data) {
    // we are sending confPassword to post, but not part of model
    
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/register';
    //if don't have the http:// -> Access-Control-Allow-Origin error

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //console.log("Sending Data:")
            //console.log(this.responseText);
            form.setState({
                regSuccess: true 
            })
        }
        else if(xhr.readyState === 4 && xhr.status === 422) {
            form.setState({
                error: this.responseText.substring(2, this.responseText.length-2)
                // takes out [" "] so that it matches syntax of other errors
            });
        }
    };
    
    xhr.send(data);
}

export default submitHelper;
*/
/*const submitHelper = async (form, data) => {
    // we send confPassword to post but not part of model so wont be stored

    let url =  'http://localhost:3000/api/register';
    try {
        const response = await fetch(url, {
            method:'POST',
            body:data
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
        throw new Error('Request failed!');
    } catch(err) {
        console.log(err);
    }
}

export default submitHelper;
*/
/*
function submitHelper(form, data) {
    // we are sending confPassword to post, but not part of model
    
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/register';
    //if don't have the http:// -> Access-Control-Allow-Origin error

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //console.log("Sending Data:")
            //console.log(this.responseText);
            form.setState({
                regSuccess: true 
            })
        }
        else if(xhr.readyState === 4 && xhr.status === 422) {
            form.setState({
                error: this.responseText.substring(2, this.responseText.length-2)
                // takes out [" "] so that it matches syntax of other errors
            });
        }
    };
    
    xhr.send(data);
}

export default submitHelper;
*/
/*
function submitHelper(form, data) {
    // we are sending confPassword to post, but not part of model
    
    //create the xhr object
    let xhr  = new XMLHttpRequest();
    let url =  'http://localhost:3000/api/register';
    //if don't have the http:// -> Access-Control-Allow-Origin error

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //console.log("Sending Data:")
            //console.log(this.responseText);
            form.setState({
                regSuccess: true 
            })
        }
        else if(xhr.readyState === 4 && xhr.status === 422) {
            form.setState({
                error: this.responseText.substring(2, this.responseText.length-2)
                // takes out [" "] so that it matches syntax of other errors
            });
        }
    };
    
    xhr.send(data);
}

export default submitHelper;
*/