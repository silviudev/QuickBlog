var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware/index");

//INDEX route for blog posts 
router.get("/:name", function(req,res){
        User.findOne({username: req.params.name}, function(err,foundUser){
        if(err || foundUser === null){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("posts", {posts : foundUser.posts, blogAuthor: foundUser.username});
        }
    });
});

//NEW route for posts- show new post form
router.get("/:name/new", middleware.isLoggedIn, function(req,res){
    res.render("new", {blogAuthor : req.params.name});
});

//CREATE route to create new blog post
router.post("/:name", function(req,res){
        req.body.post.body = req.sanitize(req.body.post.body);
        var postContent = {
            title : req.body.post.title,
            image : req.body.post.image,
            body  : req.body.post.body
        };
        User.findOne({username: req.params.name}, function(err,foundUser){
        if(err || foundUser === null){
            console.log(err);
            res.redirect("/");
        }else{
            foundUser.posts.push(postContent);
            foundUser.save(function(err,user){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/" + req.params.name);
                }
            });
        }
    });
});

//SHOW route to show individual blog post
router.get("/:name/:id", function(req,res){
   User.findOne({username: req.params.name}, function(err,foundUser){
       if(err){
           console.log(err);
           res.redirect("back");
       }else{
           //find the post with the passed in ID within the blog author's post array
           foundUser.posts.forEach(function(post){
                if(post._id == req.params.id){
                    res.render("show", {post: post});
                }else{
                    res.redirect("back");
                }
           });
       }
   });
});


module.exports = router;