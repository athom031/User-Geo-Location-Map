const mongoose = require('mongoose');

//depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//attempt to connect with the mongodb_uri based on config initialization
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});


//import the user model for the database data points and will be called in app.js
require('./userModel');