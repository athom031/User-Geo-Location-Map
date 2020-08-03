/*takes register form data to register user on server side*/
function submitHelper(form, data) {
    
    //create xml http request object (xhr)
    let xhr  = new XMLHttpRequest();
    //without http:// -> Access-Control-Allow-Origin error
    let url =  'http://localhost:3000/api/register';

    //open a connection
    xhr.open("POST", url, true);

    //set request header (type of content being sent)
    xhr.setRequestHeader("Content-Type", "application/json");

    //create state change callback
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200)
            form.setState( { regSuccess: true } );
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