//check env
const env = process.env.NODE_ENV || 'development';

//when application is started can pass value for it 
    //call ex:
    //NODE_ENV=production node app.js
//default is development

//fetch env config data
const config = require('./config.json');
const envConfig = config[env];
//will only save the configData based on env variable

//can't innumerate that so lets change this into an innumerable array
//and then innumerate through this array and assign process.env values

Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});
