/* sends sign off post call on server side and 
   will turn user data to offline when log off btn is pressed */

function signoffHelper(data) {
    return new Promise((resolve, reject) => {
        //create xml http request object (xhr)
        let xhr  = new XMLHttpRequest();
        //without http:// -> Access-Control-Allow-Origin error
        let url =  'http://localhost:3000/api/signoff';

        //open a connection
        xhr.open("POST", url, true);

        //set request header (type of content being sent)
        xhr.setRequestHeader("Content-Type", "application/json");

        //create state change callback
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200)
                resolve(JSON.parse(this.responseText).message); 
            else if(xhr.readyState === 4)
                reject(JSON.parse(this.responseText).message);
        };

        xhr.send(data);
    })
}

export default signoffHelper;