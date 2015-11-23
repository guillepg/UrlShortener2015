process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var config = require("../backend/config");
var appFunctions = require("../backend/handlers/functions.js");
var server;

describe("CeckStatus", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });
  /* beforeEach(function() {
        if (server == null) server = require('../index.js');
        else server.start();
    });
    afterEach(function() {
        server.close();  // After all server related tests, close the server
    });
*/

    it("check a valid url should return a 200 value", function(done, statusGet) {
        var testUrl = "http://www.unizar.es";
        appFunctions.checkURL(testUrl, function(status){
            statusGet = status;
        });
        expect(statusGet).toBe(200);

        done();

    });

});

