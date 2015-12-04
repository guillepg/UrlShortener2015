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
        var apikey = config.APIKEY
        var url = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=DimGray&key="+apikey+"&appver=1&pver=3.1&url="+urlToCheck;

        https.get(url, function(res) {
            res.on('data', function(d) {
                callback(d.toString());
            });
        }).on('error', function(error){
            callback("error 1"); //For the moment, must change
        });
    }
    else
        callback("error 2");  //For the moment, must change

}

module.exports = {

    short: short,
    checkURL: checkURL,
    safeBrowser: safeBrowser
};