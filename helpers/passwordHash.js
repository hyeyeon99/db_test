var crypto = require('crypto');
var mysalt = "protector";

module.exports = function(password){
    return crypto.createHash('sha512').update( password + mysalt).digest('base64');
};