//helper function called to check form input before continuing on to check server side validation
function checkData(form, d) {
    let check = false;

    let data = JSON.parse(d);
    
    //1) password matches confPassword
    if(data.password !== data.confPassword) {
        form.setState({
            error: 'ERROR: Typed passwords do not match'
        });
    }
    //2) password constraints check
    else if (data.password.toLowerCase() === data.password || /^[a-zA-Z]+$/.test(data.password) || data.password.length < 6) {
        form.setState({
            error: 'ERROR: Password must have a minimum of 6 characters with atleast 1 uppercase letter and 1 non-letter'
        });
    }
    //3) username is only one word
    else if (data.userName.split(' ').length > 1 || data.userName.split('\\').length > 1) {
        form.setState({
            error: 'ERROR: Username cannot have spaces or backslashes'
        });
    }
    else {
        check = true;
    }

    return check;
}

export default checkData;
