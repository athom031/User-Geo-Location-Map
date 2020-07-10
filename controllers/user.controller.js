const mongoose = require('mongoose');

const User = mongoose.model('User');

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

    //user.email =  req.body.email;
    //user.password = req.body.password ;

    //still have the fourth param -> encrypted password
    user.save((err, doc) => {
        if(!err)
            res.send(doc);
        else {
            //console.log(err);
            
            //particular check on if the email in system is unique
            //name and password can be the same
            if(err.code === 11000) 
                res.status(422).send(['Duplicate username foud.']);
            else 
                return next(err); //if this isn't the error return the other errors
        }
    });
}