process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var config = require("../backend/config");
var server;

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

    it("the base URL shoudl return 200", function(done) {
        request(config.baseURL, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            }
        );

    });

});

