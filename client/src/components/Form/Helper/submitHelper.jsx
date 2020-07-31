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