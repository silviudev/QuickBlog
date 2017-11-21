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
                    res.render("show", {post: post, blogAuthor: foundUser.username});
                }
           }); 
       }
   });  
});


//EDIT route to show edit blog post form
router.get("/:name/:id/edit", function(req,res){
   var foundID = false;
   User.findOne({username: req.params.name}, function(err,foundUser){
       if(err || foundUser === undefined || foundUser === null){
           console.log(err);
           res.redirect("back");
       }else{
           //find the post with the passed in ID within the blog author's post array
           foundUser.posts.forEach(function(post){
                if(post._id == req.params.id){
                    res.render("edit", {post: post, blogAuthor: foundUser.username});
                    foundID = true;
                }
           });
           
           if(!foundID){ 
               res.redirect("back");               
           }

       }
   });      
});

//UPDATE route to update a blog post
router.put("/:name/:id", function(req,res){
    req.body.post.body = req.sanitize(req.body.post.body);
    User.findOne({username: req.params.name}, function(err,foundUser){
        if(err || foundUser === null){
            console.log(err);
            res.redirect("/");
        }else{
            foundUser.posts.forEach(function(post){
                if(post._id == req.params.id){
                    post.title = req.body.post.title;
                    post.image = req.body.post.image;
                    post.body  = req.body.post.body;
                }
            });
            foundUser.save(function(err,user){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/" + req.params.name + "/" + req.params.id);
                }
            });
        }
    }); 
});

//DELETE route for blog post
router.delete("/:name/:id", function(req,res){
    var index = -1;
    User.findOne({username: req.params.name}, function(err,foundUser){
        if(err || foundUser === null || foundUser === undefined){
            console.log(err);
            res.redirect("/");
        }else{
            for(var i =0; i < foundUser.posts.length; i++){
                if(foundUser.posts[i]._id == req.params.id){
                    index = i;
                }
            }
            foundUser.posts.splice(index,1);
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
 
module.exports = router;