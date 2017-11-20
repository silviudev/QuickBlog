var express = require("express");
var router = express.Router();
var Post = require("../models/post");

//Index route for posts
router.get("/", function(req,res){
        Post.find({}, function(err,allposts){
        if(err){
            console.log(err);
        }else{
            res.render("blogs", {posts : allposts});
        }
    });
});

//New route for blogs - show new blog form
router.get("/new", function(req,res){
    res.render("new");
});


module.exports = router;