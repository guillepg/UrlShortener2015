var request = require('request');
var crypto = require('crypto');

module.exports = {

    short: function(urlToShort){
        return crypto.createHash('sha1').update(urlToShort).digest('hex');
    }

};