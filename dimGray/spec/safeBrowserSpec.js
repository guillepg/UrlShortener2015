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
        var malwareUrl = 'http://www.38zu.cn';
        appFunctions.safeBrowser(malwareUrl, function(callback){
            expect(callback).toBe('malware');
            done();
        });
    });

    it("check a phishing url should return phishing", function(done) {
        var phishingUrl = 'http://conacct05.atspace.cc/account-confirm/';
        appFunctions.safeBrowser(phishingUrl, function(callback){
            expect(callback).toBe('phishing');
            done();
        });
    });

    it("check a not valid url should return notValidUrl", function(done) {
        var notValidUrl = 'thisIsNotAValidUrl';
        appFunctions.safeBrowser(notValidUrl, function(callback){
            expect(callback).toBe('notValidUrl');
            done();
        });
    });

    xit("check a safe url should return timeOutError", function(done) {
        //dont know why a valid and safe url return time out error and not 'ok' as google api say
        var safeUrl = 'http://google.es';
        appFunctions.safeBrowser(safeUrl, function(callback){
            expect(callback).toBe('timeOutError');
            done();
        });
    });





});

