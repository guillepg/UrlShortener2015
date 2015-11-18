var mongoose = require('mongoose');

// DEFINE SCHEMA
UrlDB = new mongoose.Schema({
    realUrl : { type: String, required: true },
    shortedUrl : { type: String, required: true, unique: true }
});
