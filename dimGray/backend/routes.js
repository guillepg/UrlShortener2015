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
    //Just for postman manually test
    get(function(req, res){
        appFunctions.safeBrowser('http://google.com/',function(callback){
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
                    "numberUses":1};
                db.add(json, function(err, result){
                    //url already in DB
                    if(err)
                        db.find(shortedUrl, function(err, result){
                            //unknow error
                            if(err) res.status(500).send("Error")  //Mejorar formato errores
                            else res.send(result); //falta sumar 1 a numberUses
                        });
                    else res.send(json);
                });
            }
            else res.status(500).send("Error")    //// MEJORAR
        });
    })

apiRoutes.route('/shortCSV')
    .post(function(req,res){
        var csvFile = req.body.csvFile;
        //Just for test
        var csvFile = "http://www.google.com,http://www.unizar.es";

        appFunctions.getCSVArray(csvFile, function(callback){
            //use index for get what urls fail
            var index;
            var test = "";
            for (index = 0; index < callback.length; ++index) {
                test += callback[index]+'\n';
            }

            res.send(test);

        })


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
