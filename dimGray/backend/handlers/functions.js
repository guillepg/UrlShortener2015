var request = require('request');
var crypto = require('crypto');
var http = require('http');
var https = require('https');
var express = require ('express');
var SafeBrowse = require('safe-browse');
var config = require("../config");


//var safeBrowser = new SafeBrowse.Api(config.APIKEY);


var checkURL = function(urlToCheck, callback){

    if(urlToCheck.toString().substring(0,7) === "http://"){
        http.get(urlToCheck, function(res) {
            callback(res.statusCode);
        }).on('error', function(error){
            callback(404);
        });
    }
    else
        callback(500);
};

var short = function(urlToShort){
    return crypto.createHash('sha1').update(urlToShort).digest('hex');
};

var safeBrowser = function(urlToCheck, callback){

    if(urlToCheck.toString().substring(0,7) === "http://"){
        var url = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=DimGray&key=AIzaSyC0ZNJJlGQNLPgwVmswzxYA_Hm1R-jko6Q&appver=1&pver=3.1&url="+urlToCheck;

        https.get(url, function(res) {
            res.on('data', function(d) {
                callback(d);
            });
        }).on('error', function(error){
            callback(e);
        });
    }
    else
        callback(ee);

}

module.exports = {

    short: short,
    checkURL: checkURL,
    safeBrowser: safeBrowser
};