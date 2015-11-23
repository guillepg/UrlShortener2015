var request = require('request');
var crypto = require('crypto');
var http = require('http');

module.exports = {

    short: function(urlToShort){
        return crypto.createHash('sha1').update(urlToShort).digest('hex');
    },

    checkURL: function(urlToCheck, callback){
        var options = {
            host: urlToCheck

        };
        http.get(urlToCheck, function(response) {
            callback(response.statusCode);
        });

    }

};