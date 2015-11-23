// =============================================================================
//  This file defines the endpoints for the RESTFul API and the routes for the
//  application.
// =============================================================================


var express = require('express');
var crypto = require('crypto');
var appFunctions = require('./handlers/functions');
var db = require('./model/dbModel');
//var User    = require('./user-model');
//var BookMarks = require('./bookmark-model');
//var authMiddleware = require('./auth-middleware').basicMiddleware;

/* API ROUTES */
var apiRoutes = express.Router();

//Enable Cross Origin Requests
apiRoutes.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API entry point
apiRoutes.get('/', function(req, res) {
    res.json('Welcome to DimGray API');
});



apiRoutes.route('/shorted').
    //getALl the shorted URIS
    get(function(req, res){
        db.findAll(function(err,result){
            res.send(result);
        });
        appFunctions.checkURL("fe");
    })

//url-shortener
apiRoutes.route('/short')

    .get(function(req, res){
        var realURL = req.param("urlToShort");
        var shortedUrl = appFunctions.short(req.param("urlToShort"));
        var json = {"realUrl":realURL, "shortedUrl":shortedUrl};
        db.add(json, function(err, result){
            res.send(json);
        });

    })


/* GLOBAL ROUTES */
// API endpoints go under '/api' route. Other routes are redirected to
// index.html where AngularJS will handle frontend routes.
var routes = express.Router();
routes.use('/api', apiRoutes);
routes.get('*', function(req, res) {
    console.log(__dirname);
    res.sendFile('index.html', {'root': 'public/src'});
});

module.exports = routes;
