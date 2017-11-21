var middlewareObject = {};
var User = require("../models/user"); 

middlewareObject.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
};

middlewareObject.checkBlogOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        User.findOne({username: req.params.name}, function(err,foundUser){
            if(err){
                console.log(err);
                res.redirect("/");
            }else{
                if(foundUser.username == req.user.username){
                    next();                     
                }else{
                    req.flash("error" , "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You must be logged in to do that");
        res.redirect("/login");       
    }
};


module.exports = middlewareObject;