var request = require('request');
var crypto = require('crypto');
var http = require('http');
var express = require ('express');

module.exports = {

    short: function(urlToShort){
        return crypto.createHash('sha1').update(urlToShort).digest('hex');
    },

    checkURL: function(urlToCheck, callback){

        if(urlToCheck.toString().substring(0,7) === "http://"){
            http.get(urlToCheck, function(res) {
                callback(res.statusCode);
            }).on('error', function(error){
                callback(404);
            });
        }
        else
            callback(500);

        ;
    }
};