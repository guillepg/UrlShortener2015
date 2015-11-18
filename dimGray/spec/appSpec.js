process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var config = require("../backend/config");
var UrlDB = require("../backend/model/dbModel");
var appFunctions = require("../backend/handlers/functions");
var server;
var console = require('console').Console;


describe("Web server", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    beforeEach(function() {
        if (server == null) server = require('../index.js');
        else server.start();
    });
    afterEach(function() {
        server.close();  // After all server related tests, close the server
    });

    it("the real URL and the shorted URL should return the same", function(done) {

        var testUrl = "http://www.unizar.es";
        var shortedUrl =  appFunctions.short(testUrl);
        var bodyTest, bodyTestShorted, respTest, respTestShorted;

        request(testUrl, function (error, response, body) {
                bodyTest=body;
                respTest=response;
                expect(response.statusCode).toBe(200);
            }
        );

        //Creating a entrance to the bd with the Shorted URL
        new UrlDB({
            realUrl: testUrl,
            shortedUrl:shortedUrl
        }).save(function(err){
               if(err) bodyTestShorted=err;
                else expect(true).toBe(false);
            });

        //now ping to the created URLShorted
        UrlDB.findOne({"shortedUrl": shortedUrl});

        request(testUrl, function (error, response, body) {
                bodyTestShorted=body;
                respTestShorted=response;
                expect(response.statusCode).toBe(200);
            }
        );

        expect(bodyTest).toBe(bodyTestShorted);
        expect(respTest).toBe(respTestShorted);

        done();
    });

});