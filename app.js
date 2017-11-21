//Require our dependencies
var express               = require("express"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    User                  = require("./models/user"),
    expressSanitizer      = require("express-sanitizer");

var app = express();

//Connect to database
mongoose.connect("mongodb://localhost/quickblog", {useMongoClient: true});
mongoose.Promise = global.Promise;


//Set view engine to ejs, to serve templates from views directory
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
 
app.use(require("express-session")({
    secret: "This is the string used for encoding things",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Get the routes
var indexRoutes = require("./routes/index");
var blogPostRoutes = require("./routes/posts");

//set up Local variables for use in all routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

//Use routes
app.use(indexRoutes);
app.use(blogPostRoutes);
 

//start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("QuickBlog server started");
})