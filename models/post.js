var mongoose = require("mongoose");
var commentSchema = require("./comment.js");

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    comments: [commentSchema]
});

module.exports = postSchema;