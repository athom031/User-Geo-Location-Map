
/* upon running application can define NODE_ENV
    ie: NODE_ENV=production node app.js
    default is development */
const env = process.env.NODE_ENV || 'development';
    
//fetch env config data
const config = require('./config.json');
//will only save the configData based on env variable
const envConfig = config[env];

//change to innumerable array and assign process.env values
Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});
