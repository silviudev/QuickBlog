var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
   author: String,
   content: String
});

module.exports = commentSchema;