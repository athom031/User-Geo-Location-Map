function signoffHelper(data) {
    console.log(data);

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
            console.log(this.responseText); 
        else if(xhr.readyState === 4)
            console.log(JSON.parse(this.responseText).message);
    };
    
    xhr.send(data);
}

export default signoffHelper;

/*
var data = JSON.stringify( { "userName": JSON.parse(d).userName } );
    
//create xml http request object (xhr)
let xhr  = new XMLHttpRequest();
//without http:// -> Access-Control-Allow-Origin error
let url =  'http://localhost:3000/api/signin';

//open a connection
xhr.open("POST", url, true);

//set request header (type of content being sent)
xhr.setRequestHeader("Content-Type", "application/json");

//create state change callback
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200)
        form.setState( { signSuccess: true } );
    else if(xhr.readyState === 4)
        form.setState( { signError: JSON.parse(this.responseText).message } );
};

xhr.send(data);
}

export default signinHelper;
*/