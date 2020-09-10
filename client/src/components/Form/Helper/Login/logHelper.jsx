import signinHelper from './signinHelper';

// sends authenticate post call on server side
function logHelper(form, data) {
    return new Promise((resolve, reject) => {
        let xhr  = new XMLHttpRequest();
       
        //without http:// -> Access-Control-Allow-Origin error    
        let url = 'http://localhost:3000/api/authenticate';
        
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = async function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                form.setState( { logSuccess: true } )
                let message = await signinHelper(form, data);
                console.log(message);
                resolve('Correct User Credentials');
            }
            else if(xhr.readyState === 4) { 
                form.setState( { errorCheck: JSON.parse(this.responseText).message } );
                reject('Rejected Credentials');
            }
        };
        
        xhr.send(data);
    })
}

export default logHelper;