const mongoose = require('mongoose');

const User = mongoose.model('User');
//call user model we have defined

//mongo db data point
module.exports.register = (req, res, next) => {
    var user = new User();
    //create a user type

    //assign user values
    user.fullName = req.body.fullName;
    user.userName = req.body.userName;
    user.address = req.body.address;
    user.password = req.body.password;
    user.confPassword = req.body.confPassword;
    //received from client side
    //saltSecret will be assigned in function
    
    //console.log(/^[a-zA-Z]+$/.test(user.password));

    if(user.password != user.confPassword) {
        res.status(422).send(['Typed passwords do not match']);
    }
    else {
        //still have the fourth param -> encrypted password
        user.save((err, doc) => {
            if(!err) { 
                res.send(doc);
            }
            else {
                //username is set to unique, check for error
                if(err.code === 11000) 
                    res.status(422).send(['Duplicate username foud.']);
                else     
                    return next(err); //if this isn't the error return the other errors
            }
        });
    }
    //console.log(user.password);
    //console.log(user.confPassword);
}
