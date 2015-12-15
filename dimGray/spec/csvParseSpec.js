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
        var expectedOutput = ['1','2'];
        appFunctions.getCSVArray(input,function(callback){
            expect(callback).toEqual(expectedOutput);
            done();
        })
    });
    it("testing for each csv-parse", function(done){
        var csv = "a,b,c";
        var csvArray = ["a","b","c"]
        appFunctions.getCSVArray(csv, function(callback){
            var index;
            for (index = 0; index < callback.length; ++index) {
                expect(csvArray[index]).toEqual(callback[index]);
            }
            done();
        })

    });
    it("testing for each csv-parse with comments in csvFile", function(done){
        var csv = "#comment in csv\na,b,c";
        var csvArray = ["a","b","c"]
        appFunctions.getCSVArray(csv, function(callback){
            var index;
            for (index = 0; index < callback.length; ++index) {
                expect(csvArray[index]).toEqual(callback[index]);
            }
            done();
        })

    });

});

