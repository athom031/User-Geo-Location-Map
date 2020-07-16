const mongoose = require('mongoose');

//attempt to connect with the mongodb_uri based on config initialization
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
//import the user model for the database data points and will be called in app.js