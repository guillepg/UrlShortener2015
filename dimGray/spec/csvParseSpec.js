process.env.NODE_ENV = 'test';  // Set environment to testing
var request = require('request');
var appFunctions = require("../backend/handlers/functions.js");
var parse = require('csv-parse');

describe("CsvParse", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    it("just testing csv-parse", function(done) {
        var input = "1,2";
        parse(input, {comment: '#'}, function(err, output){
           expect(output).toEqual([["1","2"]]);
            done();
        });
    });

});

