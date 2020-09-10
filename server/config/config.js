
/* upon running application can define NODE_ENV
    default is development */
const env = process.env.NODE_ENV || 'development';
    
const config = require('./config.json');
const envConfig = config[env];

Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
});
