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
/*apiRoutes.get('/', function(req, res) {
    res.json('Welcome to DimGray API');
});*/

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
            //appFunctions.safeBrowser(realURL,function(callback){ // FALLA SAFEBROWSING
                //res.send(callback);
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
                else res.status(shorted).send("Error "+shorted)    //// MEJORAR
            //});

        });
    })

apiRoutes.route('/stats')
    .get(function(req, res){
        var shortURL = req.param("shortUrl");
        //check if the url is valid
        db.find(shortURL, function(err, result){
             //url not in DB
            if(err) res.status(404).send("Error")
            else res.send(result);
        });
    })

apiRoutes.route('/goto')
    .get(function(req, res){
        var shortURL = req.param("shortUrl");
        //check if the url is valid
        db.find(shortURL, function(err, result){
             //url not in DB
            if(err) res.status(404).send("Error")
            else{
                //http://localhost:3000/api/goto?shortUrl=e7847c6e7a9f533b763e949f66ca4ce867883bb0
                var result2 = JSON.stringify(result);
                var result3 = JSON.parse(result2);
                res.send("<html><head><title>URLshortener</title></head><body style=\"background-color: lightblue;\">"+
                "</br></br></br><center><h2>You are being redirected to "+result3.realUrl+"</h2>"+
                "<button onClick=javascript:window.location.href=\""+result3.realUrl+"\">Continue</button></center></body></html>");

            }
        });
    })

apiRoutes.route('/shortCSV')
    .post(function(req,res){
        var csvFile = ""; var output = "";
        if(typeof req.body.file !== "undefined" ){ csvFile=req.body.file; output+="(Leyendo de fichero) "+ typeof req.body.file;}
        else if(typeof req.body.text !== "undefined"  ){ csvFile=req.body.text; output+="(Leyendo de texto) ";}
        else res.send("EMPTY");

        appFunctions.getCSVArray(csvFile, function(callback){
        res.send(callback);
        })
    })

    /*OTRA FUNCION NUEVA:
    var index;
    //use index to get which urls fail
    for (index = 0; index < callback.length; ++index) {
        testFunct(callback[index]);
        db.findLong(callback[index],function(err, result, callback){
            if(err) ;
            else{
                var jotason = result;
                callback( jotason );
            }
        });
        output+=" END";
    }
    res.send(output);
    */

function testFunct(cadena){
    appFunctions.checkURL(cadena, function(shorted){
        //url valid
        //appFunctions.safeBrowser(cadena,function(callback){ // FALLA SAFEBROWSING
            if(shorted!=500 && shorted!=404){
                var shortedUrl = appFunctions.short(cadena);
                var date = new Date();
                var json = {
                    "realUrl":cadena,
                    "shortedUrl":shortedUrl,
                    "dateCreation":date.toLocaleDateString('en-US'),
                    "numberUses":1};
                db.add(json, function(err, result){
                    //url already in DB
                    if(err) db.find(shortedUrl, function(err, result){});
                });
            }
        //});
    });
}

/* GLOBAL ROUTES */
// API endpoints go under '/api' route. Other routes are redirected to
// index.html where AngularJS will handle frontend routes.
var routes = express.Router();
routes.use('/api', apiRoutes);
routes.get('/', function(req, res) {
    console.log(__dirname);
    res.sendFile('index.html', {'root': 'public/src'});
});
routes.get('/CSVpage', function(req, res) {
       console.log(__dirname);
       res.sendFile('csv_upload.html', {'root': 'public/src'});
});
routes.get('/css/style.css', function(req, res) {
    console.log(__dirname);
    res.sendFile('style.css', {'root': 'public/src/css'});
});
routes.get('/js/home.js', function(req, res) {
    console.log(__dirname);
    res.sendFile('home.js', {'root': 'public/src/js'});
});

module.exports = routes;
