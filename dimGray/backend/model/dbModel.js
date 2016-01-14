var mongoose = require('mongoose');

// DEFINE SCHEMA
UrlDB = new mongoose.Schema({
    realUrl : { type: String, required: true },
    shortedUrl : { type: String, required: true, unique: true },
    dateCreation: {type: Date, required: true},
    numberUses: {type: Number, required: true}
});



var UrlDB = mongoose.model('UrlDB', UrlDB);

module.exports = {
    add: function(urlToShort, callback){
        var addUrl = new UrlDB(urlToShort);
        addUrl.save(function(err){
            callback(err, addUrl);
        });
    },
    find: function(urlToFind, callback){
        
		UrlDB.update({"shortedUrl": urlToFind}, {$inc: { numberUses: 1 }}, {upsert: true}, function(err){
			UrlDB.findOne({"shortedUrl": urlToFind},{_id:0, __v:0}, function(err, res){
			
			callback(err,res);
        });
		})

    },
    findLong: function(urlToFind, callback){
        UrlDB.find({"realUrl": urlToFind},{_id:0, __v:0}, function(err, res){
            callback(err,res[0]);
        });
    },
    findAll: function(callback){
        UrlDB.find({},{_id:0, __v:0}, function(err, res){
           callback(err,res)
        });
    }
};