process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var appFunctions = require("../backend/handlers/functions.js");

describe("CeckStatus", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    it("check a malware url should return malware", function(done) {
        var malwareUrl = "http://www.38zu.cn";
        appFunctions.safeBrowser(malwareUrl, function(body){
            expect(body).toBe(200);
            done();
        });

        done();
    });

});

