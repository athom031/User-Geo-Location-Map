const jwt = require('jsonwebtoken'); //JWT

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1]; //returns array of bearer [jwt] -> return jwt
        //Authorization : Bearer [jwt] -> header request
 
    if(!token) //if token was set
        return res.status(403).send({ auth: false, message: 'No token provided.' }); //auth: false means authentication fails
    else {
        jwt.verify(token, process.env.JWT_SECRET, //needed to decrypt
            (err, decoded) => { //decoded will be the actual payload
                if(err)
                    return res.status(500).send({auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next(); 
                }
            } 
        )
    } 
}