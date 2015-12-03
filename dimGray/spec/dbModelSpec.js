process.env.NODE_ENV = 'test';  // Set environment to tes
var request = require('request');
var db = require("../backend/model/dbModel.js");

describe("dbModel", function() {

    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

});


