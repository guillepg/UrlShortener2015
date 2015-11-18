// =============================================================================
//  This file defines the endpoints for the RESTFul API and the routes for the
//  application.
// =============================================================================


var express = require('express');
var crypto = require('crypto');

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

//url-shortener
apiRoutes.route('/short')
    // Get status of a web
    .get(function(req, res){
        res.json( crypto.createHash('sha1').update(req.param("urlToShort")).digest('hex'));

    });

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
