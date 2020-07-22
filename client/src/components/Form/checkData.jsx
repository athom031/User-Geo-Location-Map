function checkData(form, d) {
    let check = true;

    let data = JSON.parse(d);
    
    //things to check
        //1) password matches confPassword
        //2) password constraints
        
    //1) password matches confPassword
    if(data.password !== data.confPassword) {
        check = false;
        form.setState({
            error: 'ERROR: Typed passwords do not match'
        });
    }
    //2) password constraints check
    else if (data.password.toLowerCase() === data.password || /^[a-zA-Z]+$/.test(data.password) || data.password.length < 6) {
        check = false;
        form.setState({
            error: 'ERROR: Password must have a minimum of 6 characters with atleast 1 uppercase letter and 1 non-letter'
        });
    }
    return check;
}

export default checkData;
