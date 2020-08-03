//export/import not default in node js so use module.exports/require

//config env variable
require('./config/config'); 

//connect to mongo db
require('./models/db'); 

//we are using passport for our login authentication
require('./config/passportConfig'); 

//express server -> create middleware app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport'); //login

//html request to register mongo db data point
const rtsIndex = require('./routes/indexRouter');

var app = express();

const UserData = require('./models/userModel');

//configure middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize()); //login
app.use('/api', rtsIndex);

//error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
}); 

//start server through our express server middleware
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

app.get('/api/data', (req, res) => {
    UserData.find({ })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error ', error);
        });
});