//keys.js, determine which credentials to use

if(process.env.NODE_ENV === 'production') {
    //provide prod keys
    module.exports = require('./prod');
} else {
    //provide dev keys
    module.exports = require('./dev');
}