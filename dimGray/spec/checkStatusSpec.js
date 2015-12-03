process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var config = require("../backend/config");
var appFunctions = require("../backend/handlers/functions.js");

describe("CeckStatus", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    it("check a valid url should return a 200 value", function(done) {
        var testUrl = "http://www.unizar.es";
        appFunctions.checkURL(testUrl, function(shorted){
            expect(shorted).toBe(200);
            done();
        });
    });

    it("check a not valid url should return a 500 value", function(done) {
        var testUrl = "not valid url";
        appFunctions.checkURL(testUrl, function(shorted){
            expect(shorted).toBe(500);
            done();
        });
    });

    it("check a unrecheable url should return a 404 value", function(done) {
        var testUrl = "http://www.ThisIsAUnrecheableUrlForSure.cat";
        appFunctions.checkURL(testUrl, function(shorted){
            expect(shorted).toBe(404);
            done();
        });
    });

});

