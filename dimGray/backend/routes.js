// =============================================================================
//  This file defines the endpoints for the RESTFul API and the routes for the
//  application.
// =============================================================================

var express = require('express');
var crypto = require('crypto');
var appFunctions = require('./handlers/functions');
var db = require('./model/dbModel');

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

apiRoutes.route('/test').
    //getALl the shorted URIS
    get(function(req, res){
        appFunctions.safeBrowser('http://www.38zu.cn',function(callback){
            res.send(callback);
        });

    })

apiRoutes.route('/shorted').
    //getALl the shorted URIS
    get(function(req, res){
        db.findAll(function(err,result){
            res.send(result);
        });
    })

//url-shortener
apiRoutes.route('/short')
    .get(function(req, res){
        var realURL = req.param("urlToShort");
        //check if the url is valid

        appFunctions.checkURL(realURL, function(shorted){
            //url valid
            if(shorted!=500 && shorted!=404){
                var shortedUrl = appFunctions.short(req.param("urlToShort"));
                var date = new Date();

                var json = {"realUrl":realURL,
                    "shortedUrl":shortedUrl,
                    "dateCreation":date.toLocaleDateString('en-US'),
                    "numberUses":0};
                db.add(json, function(err, result){
                    //url already in DB
                    if(err)
                        db.find(shortedUrl, function(err, result){
                            //unknow error
                            if(err) res.status(500).send("Error")  //Mejorar formato errores
                            else res.send(result);
                        });
                    else res.send(json);
                });
            }
            else res.status(500).send("Error")    //// MEJORAR
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
