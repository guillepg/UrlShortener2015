var request = require('request');
var crypto = require('crypto');
var http = require('http');
var https = require('https');
var express = require ('express');
var config = require("../config");
var CSVparse = require('csv-parse');
var SafeBrowse = require('safe-browse');

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
    var apiSafebrowsing = new SafeBrowse.Api( config.APIKEY, {pver: "3.0", debug: true,
    api: "https://sb-ssl.google.com/safebrowsing/api/lookup",client: "api", appver: "1.0"});
    if(urlToCheck.toString().substring(0,7) === "http://"){
        apiSafebrowsing.lookup(urlToCheck)
            .on( 'success', function ( data ) {
                callback(data);
            } )
            .on( 'error', function ( error ) {
                console.log(error.message);
                callback(error);
            } );
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