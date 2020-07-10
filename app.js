require('./config/config');
//config env variable

require('./models/db');
//connect to mongo db

//express server -> create middleware app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rtsIndex = require('./routes/index.router');
//html request to register mongo db data point

var app = express();

//configure middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api', rtsIndex);
//post request: /api/register
//'/api/register' will be the user request handled by usrctrl.register

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