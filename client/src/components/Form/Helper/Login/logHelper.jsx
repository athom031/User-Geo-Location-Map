import signinHelper from './signinHelper';

/* sends authenticate post call on server side */
function logHelper(form, data) {

    //create xml http request object (xhr)
    let xhr  = new XMLHttpRequest();
    //without http:// -> Access-Control-Allow-Origin error    
    let url =  'http://localhost:3000/api/authenticate';
    
    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            form.setState( { logSuccess: true } )
            signinHelper(form, data);
        }
        else if(xhr.readyState === 4) { 
            form.setState( { errorCheck: JSON.parse(this.responseText).message } );
        }
    };
    
    xhr.send(data);
}

export default logHelper;
