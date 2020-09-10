//takes register form data to register user on server side
function submitHelper(form, data) {
    return new Promise((resolve, reject) => {
        let xhr  = new XMLHttpRequest();

        //without http:// -> Access-Control-Allow-Origin error
        let url =  'http://localhost:3000/api/register';

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                form.setState( { regSuccess: true } );
                resolve("Submission Success");
            }
            else if(xhr.readyState === 4 && xhr.status === 422) {
                form.setState({
                    error: this.responseText.substring(2, this.responseText.length-2)
                    // takes out [" "] so that it matches syntax of other errors
                });
                reject("Submission Error")
            }
        };
        
        xhr.send(data);
    })
}

export default submitHelper;