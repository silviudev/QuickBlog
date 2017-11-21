var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req,res){
    res.render("landing");    
});

//New route for showing registration form
router.get("/register", function(req,res){
    if(!req.user){
        res.render("register");        
    }else{
        res.redirect("/");
    }
});

//POST route for registering new user
router.post("/register", function(req,res){
    User.register(new User({username: req.body.username.toLowerCase()}), req.body.password, function(err,user){
       if(err){
            console.log(err);
            res.redirect("/register");
       }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/" + user.username);
            });
       } 
    });
});

//New route for showing login form
router.get("/login", function(req,res){
   if(!req.user){
      res.render("login");    
   }else{
       res.redirect("/");
   }

});

//POST route for logging in
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login"
}), function(req,res){
    res.redirect("/" + req.user.username);
});

//Logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});
 
module.exports = router;