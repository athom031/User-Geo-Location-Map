function checkData(d) {
    let check = true;

    let data = JSON.parse(d);
    //console.log(test.fullName);
    if(data.fullName === "Alex") {
        document.getElementById("pass").style.label.color= "red";
    }
    else if(data.password !== data.confPassword) {
        check = false;
        alert('Typed passwords do not match');
    }
    else if(data.password.toLowerCase() === data.password || /^[a-zA-Z]+$/.test(data.password)) {
        check = false;
        alert('Password must have atleast 1 uppercase letter and 1 non-letter');
    }
    return check;
}

function submitHelper(data) {
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
            console.log(this.responseText);
        }
        else {
            console.log(xhr.status);
            console.log(this.responseText);
        }
    };
    
    xhr.send(data);
}

export { checkData, submitHelper };