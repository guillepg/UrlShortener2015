// =============================================================================
//  This file is the entry point of the application
// =============================================================================

/* DEPENDENCIES */
// -----------------------------------------------------------------------------
//External packages
var express  = require('express');          // Route management framework
var override = require('method-override');  // PUT, PATCH and DELETE methods
var parser   = require('body-parser');      // Parser for requests' body
var mongoose = require('mongoose');         // MongoDB driver for node
var morgan   = require('morgan');           // Request logger
//var passport = require('passport');         // Authentication middleware
//Internal dependencies
var routes = require("./backend/routes");
var config = require("./backend/config");


/* SERVER CONFIG */
// -----------------------------------------------------------------------------
var app  = express();                 // Initialise express application
var port = config.port  // Read PORT from environment or use 3000

/* Middleware setup (order does matter) */
//app.use(express.static(__dirname + '/public/dist')); // Set frontend files' path
// If we are not testing, set log level to 'dev'
if (process.env.NODE_ENV != 'test') { app.use(morgan('dev')); }
// Middleware that will allow us to decode request parameteres
app.use(parser.json());
app.use(parser.urlencoded({'extended': 'false'}));
app.use(parser.json({ type: 'application/vnd.api+json' }));
app.use(override());
// Authentication middleware initialization (not used yet)
//app.use(passport.initialize());
// Last, add the routes to the application
app.use(routes);

/* DEFINE STARTUP AND SHUTDOWN FUNCTIONS */
// -----------------------------------------------------------------------------
var server;
function start() {
    mongoose.connect(config.database);  // Connect to database through mongoose
    server = app.listen(port, function() {  // Start server activity
        if (process.env.NODE_ENV !== 'test')
            console.log("Something beautiful is happening on port " + port);
    });
}
function close() {
    mongoose.connection.close(function() {
        if (process.env.NODE_ENV !== 'test')
            console.log('Terminating mongoose connection');
    });
    if (process.env.NODE_ENV !== 'test')
        console.log('Shutting down the server');
    server.close();
};

module.exports = {
    start: start,
    close: close
}

/* SERVER START */
start();