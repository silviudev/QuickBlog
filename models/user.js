var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var postSchema = require("./models/post.js");

var UserSchema = new mongoose.Schema(
   {
       username: String,
       password: String,
       posts: [postSchema]
   } 
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);