var request = require('request');
var crypto = require('crypto');
var http = require('http');
var https = require('https');
var express = require ('express');
var config = require("../config");
var CSVparse = require('csv-parse');

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

//Still not work fine
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
        callback('notValidUrl');  //For the moment, must change

}

var getCSVArray = function(csvFile, callback){
    CSVparse(csvFile, {comment: '#'}, function(err, output){
        if(!err){
            callback(output[0]);
        }
    });
}

module.exports = {

    short: short,
    checkURL: checkURL,
    safeBrowser: safeBrowser,
    getCSVArray: getCSVArray
};